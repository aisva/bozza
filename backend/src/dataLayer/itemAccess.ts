import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';
import { createDynamoDBClient } from '../utils/dataAccess';
import { Item } from '../models/Item';

const logger = createLogger('itemAccess');

export class ItemAccess {
  private readonly docClient: DocumentClient = createDynamoDBClient(logger);

  constructor(private readonly itemsTable: string = process.env.ITEMS_TABLE) {}

  async createItem(item: Item): Promise<Item> {
    logger.info('Creating an item', { itemId: item.itemId });
    await this.docClient
      .put({
        TableName: this.itemsTable,
        Item: item
      })
      .promise();
    return item;
  }
}
