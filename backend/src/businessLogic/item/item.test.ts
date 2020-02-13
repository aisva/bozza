import { ItemAccess } from '../../dataLayer/itemAccess';
import { createItem, getItems, getFilter, getItem, updateItem } from './item';
import { CreateItemRequest } from '../../requests/CreateItemRequest';
import { UpdateItemRequest } from '../../requests/UpdateItemRequest';

jest.mock('../../dataLayer/itemAccess');

describe('Item business logic - createItem()', () => {
  test('createItem() accesses the data layer once', async () => {
    expect(ItemAccess.prototype.createItem).not.toHaveBeenCalled();
    await createItem({ text: 'text', dueDate: new Date().toISOString() }, 'userId');
    expect(ItemAccess.prototype.createItem).toHaveBeenCalledTimes(1);
  });

  test('createItem() passes proper parameters to the data layer', async () => {
    const createItemRequest: CreateItemRequest = { text: 'text', dueDate: new Date().toISOString() };
    const userId = 'userId';
    await createItem(createItemRequest, userId);
    expect(ItemAccess.prototype.createItem).toHaveBeenCalledWith(
      expect.objectContaining({ userId: userId, text: createItemRequest.text, dueDate: createItemRequest.dueDate })
    );
  });
});

describe('Item business logic - getItems()', () => {
  test('getItems() accesses the data layer once', async () => {
    expect(ItemAccess.prototype.getItems).not.toHaveBeenCalled();
    await getItems('task', 'userId');
    expect(ItemAccess.prototype.getItems).toHaveBeenCalledTimes(1);
  });

  test('getItems() passes proper parameters to the data layer', async () => {
    const filter = 'task';
    const userId = 'userId';
    await getItems(filter, userId);
    expect(ItemAccess.prototype.getItems).toHaveBeenCalledWith(getFilter(filter), userId);
  });
});

describe('Item business logic - getItem()', () => {
  test('getItem() accesses the data layer once', async () => {
    expect(ItemAccess.prototype.getItem).not.toHaveBeenCalled();
    await getItem('itemId', 'userId');
    expect(ItemAccess.prototype.getItem).toHaveBeenCalledTimes(1);
  });

  test('getItem() passes proper parameters to the data layer', async () => {
    const itemId = 'itemId';
    const userId = 'userId';
    await getItem(itemId, userId);
    expect(ItemAccess.prototype.getItem).toHaveBeenCalledWith(itemId, userId);
  });
});

describe('Item business logic - updateItem()', () => {
  test('updateItem() accesses the data layer once', async () => {
    expect(ItemAccess.prototype.updateItem).not.toHaveBeenCalled();
    await updateItem({ text: 'text', dueDate: new Date().toISOString() }, 'itemId', 'userId');
    expect(ItemAccess.prototype.updateItem).toHaveBeenCalledTimes(1);
  });

  test('updateItem() passes proper parameters to the data layer', async () => {
    const updateItemRequest: UpdateItemRequest = { text: 'text', dueDate: new Date().toISOString() };
    const itemId = 'itemId';
    const userId = 'userId';
    await updateItem(updateItemRequest, itemId, userId);
    expect(ItemAccess.prototype.updateItem).toHaveBeenCalledWith(updateItemRequest, itemId, userId);
  });
});
