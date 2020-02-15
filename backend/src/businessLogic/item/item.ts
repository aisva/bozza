import * as uuid from 'uuid';
import { createLogger } from '../../utils/logger';
import { CreateItemRequest } from '../../requests/CreateItemRequest';
import { Item, Filter } from '../../models/Item';
import { ItemAccess } from '../../dataLayer/itemAccess';
import { UpdateItemRequest } from '../../requests/UpdateItemRequest';
import { ItemStorage } from '../../storageLayer/itemStorage';
import { GetItemsResponse } from '../../responses/GetItemsResponse';

const logger = createLogger('itemBusinessLogic');
const itemAccess = new ItemAccess();
const itemStorage = new ItemStorage();

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

export function getFilter(filter: string): Filter {
  return filter === Filter.Task.valueOf() ? Filter.Task : null;
}

export async function getItems(
  filter: string,
  userId: string,
  limit: number,
  nextKey: string
): Promise<GetItemsResponse> {
  logger.info('Getting items', { filter: filter, userId: userId });
  return itemAccess.getItems(getFilter(filter), userId, limit, nextKey);
}

export async function getItem(itemId: string, userId: string): Promise<Item> {
  return itemAccess.getItem(itemId, userId);
}

export async function updateItem(updateItemRequest: UpdateItemRequest, itemId: string, userId: string): Promise<void> {
  logger.info('Updating an item', { itemId: itemId });
  itemAccess.updateItem(updateItemRequest, itemId, userId);
}

export async function updateDownloadUrl(itemId: string, userId: string): Promise<void> {
  logger.info('Updating download URL', { itemId: itemId });
  itemAccess.updateDownloadUrl(itemId, userId);
}

export async function deleteItem(itemId: string, userId: string): Promise<void> {
  logger.info('Deleting an item', { itemId: itemId });
  itemAccess.deleteItem(itemId, userId);
}

export function getUploadUrl(itemId: string): string {
  logger.info('Getting upload URL', { itemId: itemId });
  return itemStorage.getUploadUrl(itemId);
}

export function prepareCreateItemRequest(createItemRequest: CreateItemRequest): CreateItemRequest {
  const request: CreateItemRequest = { text: createItemRequest.text.trim() };
  if (createItemRequest.dueDate != null) request.dueDate = createItemRequest.dueDate.trim();
  return request;
}

export function prepareUpdateItemRequest(updateItemRequest: UpdateItemRequest): UpdateItemRequest {
  return prepareCreateItemRequest(updateItemRequest);
}

export function isValidDueDate(dueDate: string): boolean {
  return !isNaN(Date.parse(dueDate));
}

export function isValidFilter(filter: string): boolean {
  return getFilter(filter) != null;
}

export function getLimit(parameter: string): number {
  if (parameter == null) return null;
  const limit = parseInt(parameter);
  return isNaN(limit) ? null : limit;
}
