import * as uuid from 'uuid';
import { createLogger } from '../../utils/logger';
import { CreateItemRequest } from '../../requests/CreateItemRequest';
import { Item, Filter } from '../../models/Item';
import { ItemAccess } from '../../dataLayer/itemAccess';

const logger = createLogger('itemBusinessLogic');
const itemAccess = new ItemAccess();

export function getFilter(filter: string): Filter {
  return filter === Filter.Task.valueOf() ? Filter.Task : null;
}

export async function getItems(filter: string, userId: string): Promise<Item[]> {
  logger.info('Getting items', { filter: filter });
  return itemAccess.getItems(getFilter(filter), userId);
}

export async function createItem(createItemRequest: CreateItemRequest, userId: string): Promise<Item> {
  const item: Item = {
    itemId: uuid.v4(),
    userId: userId,
    text: createItemRequest.text,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  if (createItemRequest.dueDate != null) item.dueDate = createItemRequest.dueDate;
  logger.info('Creating an item', { itemId: item.itemId });
  return await itemAccess.createItem(item);
}

export function prepareCreateItemRequest(createItemRequest: CreateItemRequest): CreateItemRequest {
  const request: CreateItemRequest = { text: createItemRequest.text.trim() };
  if (createItemRequest.dueDate != null) request.dueDate = createItemRequest.dueDate.trim();
  return request;
}

export function isValidDueDate(dueDate: string): boolean {
  return !isNaN(Date.parse(dueDate));
}

export function isValidFilter(filter: string): boolean {
  return getFilter(filter) != null;
}
