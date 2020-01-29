import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';
import { User } from '../models/User';

const logger = createLogger('userAccess');

export class UserAccess {
  private readonly docClient: DocumentClient = this.createDynamoDBClient();

  constructor(private readonly usersTable: string = process.env.USERS_TABLE) {}

  async createUser(user: User): Promise<User> {
    logger.info('Creating a user', { userId: user.userId });
    await this.docClient
      .put({
        TableName: this.usersTable,
        Item: user
      })
      .promise();
    return user;
  }

  async getUser(username: string): Promise<User> {
    logger.info('Getting user', { username: username });
    const result = await this.docClient
      .get({
        TableName: this.usersTable,
        Key: {
          username: username
        }
      })
      .promise();
    return result.Item as User;
  }

  private createDynamoDBClient(): DocumentClient {
    if (process.env.IS_OFFLINE) {
      logger.info('Creating a local DynamoDB instance');
      return new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      });
    }
    return new AWS.DynamoDB.DocumentClient();
  }
}