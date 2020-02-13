import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../../utils/logger';
import { getUserId } from '../../../utils/authentication';
import { generateErrorResponse } from '../../../utils/response';
import { prepareUpdateItemRequest, getItem, updateItem, isValidDueDate } from '../../../businessLogic/item/item';
import { UpdateItemRequest } from '../../../requests/UpdateItemRequest';

const logger = createLogger('updateItem');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const itemId = event.pathParameters != null ? event.pathParameters.itemId : null;
    logger.info('Processing request', { itemId: itemId });
    if (itemId == null) {
      logger.error('Invalid item id', { itemId: itemId });
      return generateErrorResponse(400, 'Invalid item id');
    }
    const updateItemRequest: UpdateItemRequest = prepareUpdateItemRequest(JSON.parse(event.body));
    const dueDate = updateItemRequest.dueDate;
    if (dueDate != null && dueDate !== '' && !isValidDueDate(dueDate)) {
      logger.error('Invalid due date', { dueDate: dueDate });
      return generateErrorResponse(400, 'Invalid due date');
    }
    try {
      const userId = getUserId(event);
      const item = await getItem(itemId, userId);
      if (item == null) {
        logger.error('Unable to fetch item', { itemId: itemId, userId: userId });
        return generateErrorResponse(404, 'Unable to fetch item');
      }
      await updateItem(updateItemRequest, itemId, userId);
      return {
        statusCode: 204,
        body: null
      };
    } catch (error) {
      logger.error(error.message, { itemId: itemId });
      return generateErrorResponse(500, error.message);
    }
  }
);

handler.use(
  cors({
    credentials: true
  })
);
