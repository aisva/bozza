import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as winston from 'winston';
import * as AWS from 'aws-sdk';

export function createDynamoDBClient(logger: winston.Logger): DocumentClient {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local DynamoDB instance');
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    });
  }
  return new AWS.DynamoDB.DocumentClient();
}
