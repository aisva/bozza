import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';
import { createDynamoDBClient } from '../utils/dataAccess';
import { Item, Filter } from '../models/Item';
import { UpdateItemRequest } from '../requests/UpdateItemRequest';

const logger = createLogger('itemAccess');

export class ItemAccess {
  private readonly docClient: DocumentClient = createDynamoDBClient(logger);

  constructor(
    private readonly itemsTable: string = process.env.ITEMS_TABLE,
    private readonly updatedAtIndex: string = process.env.ITEMS_UPDATED_AT_INDEX,
    private readonly dueDateIndex: string = process.env.ITEMS_DUE_DATE_INDEX
  ) {}

  async getItems(filter: Filter, userId: string): Promise<Item[]> {
    logger.info('Getting items', { filter: filter != null ? filter.valueOf() : null, userId: userId });
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

  async getItem(itemId: string, userId: string): Promise<Item> {
    logger.info('Getting an item', { itemId: itemId });
    const result = await this.docClient
      .get({
        TableName: this.itemsTable,
        Key: {
          userId: userId,
          itemId: itemId
        }
      })
      .promise();
    return result.Item as Item;
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

  async updateItem(updateItemRequest: UpdateItemRequest, itemId: string, userId: string): Promise<void> {
    logger.info('Updating an item', { itemId: itemId });
    const updateExpression = this.getUpdateExpression(updateItemRequest);
    await this.docClient
      .update({
        TableName: this.itemsTable,
        Key: {
          userId: userId,
          itemId: itemId
        },
        UpdateExpression: updateExpression.expression,
        ExpressionAttributeValues: updateExpression.values,
        ExpressionAttributeNames: {
          '#text': 'text'
        }
      })
      .promise();
  }

  private getUpdateExpression(updateItemRequest: UpdateItemRequest): { expression: string; values: object } {
    let expression = 'set #text = :text, updatedAt = :updatedAt';
    const values = {
      ':text': updateItemRequest.text,
      ':updatedAt': new Date().toISOString()
    };
    const dueDate = updateItemRequest.dueDate;
    if (dueDate != null) {
      if (dueDate === '') {
        expression = 'set #text = :text, updatedAt = :updatedAt remove dueDate';
      } else {
        expression = 'set #text = :text, dueDate = :dueDate, updatedAt = :updatedAt';
        values[':dueDate'] = updateItemRequest.dueDate;
      }
    }
    return { expression, values };
  }
}
