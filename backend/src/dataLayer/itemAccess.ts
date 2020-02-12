import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';
import { createDynamoDBClient } from '../utils/dataAccess';
import { Item, Filter } from '../models/Item';

const logger = createLogger('itemAccess');

export class ItemAccess {
  private readonly docClient: DocumentClient = createDynamoDBClient(logger);

  constructor(
    private readonly itemsTable: string = process.env.ITEMS_TABLE,
    private readonly updatedAtIndex: string = process.env.ITEMS_UPDATED_AT_INDEX,
    private readonly dueDateIndex: string = process.env.ITEMS_DUE_DATE_INDEX
  ) {}

  async getItems(filter: Filter, userId: string): Promise<Item[]> {
    logger.info('Getting items', { filter: filter != null ? filter.valueOf() : null });
    const result = await this.docClient
      .query({
        TableName: this.itemsTable,
        IndexName: filter === Filter.Task ? this.dueDateIndex : this.updatedAtIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        },
        ScanIndexForward: false
      })
      .promise();
    return result.Items as Item[];
  }

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
