import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../../utils/logger';
import { getUserId } from '../../../utils/authentication';
import { generateErrorResponse } from '../../../utils/response';
import { getItems, isValidFilter, getLimit } from '../../../businessLogic/item/item';

const logger = createLogger('getItems');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const filter = event.queryStringParameters != null ? event.queryStringParameters.filter : null;
    const userId = getUserId(event);
    const limit = event.queryStringParameters != null ? getLimit(event.queryStringParameters.limit) : null;
    const nextKey = event.queryStringParameters != null ? event.queryStringParameters.nextKey : null;
    logger.info('Processing request', { filter: filter, userId: userId, limit: limit, nextKey: nextKey });
    if (filter != null && !isValidFilter(filter)) {
      logger.error('Invalid filter', { filter: filter });
      return generateErrorResponse(400, 'Invalid filter');
    }
    try {
      const response = await getItems(filter, userId, limit, nextKey);
      return {
        statusCode: 200,
        body: JSON.stringify({
          ...response
        })
      };
    } catch (error) {
      logger.error(error.message, { filter: filter });
      return generateErrorResponse(500, error.message);
    }
  }
);

handler.use(
  cors({
    credentials: true
  })
);
