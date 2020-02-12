import { ItemAccess } from '../../dataLayer/itemAccess';
import { createItem, getItems, getFilter } from './item';
import { CreateItemRequest } from '../../requests/CreateItemRequest';

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
