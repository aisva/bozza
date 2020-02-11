import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../../utils/logger';
import { getUserId } from '../../../utils/authentication';
import { generateErrorResponse } from '../../../utils/response';
import { createItem, prepareCreateItemRequest, isValidDueDate } from '../../../businessLogic/item/item';
import { CreateItemRequest } from '../../../requests/CreateItemRequest';

const logger = createLogger('createItem');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event);
    const createItemRequest: CreateItemRequest = prepareCreateItemRequest(JSON.parse(event.body));
    logger.info('Processing request', { createItemRequest: createItemRequest });
    if (createItemRequest.dueDate != null && !isValidDueDate(createItemRequest.dueDate)) {
      logger.error('Invalid due date', { createItemRequest: createItemRequest });
      return generateErrorResponse(400, 'Invalid due date');
    }
    try {
      const item = await createItem(createItemRequest, userId);
      return {
        statusCode: 201,
        body: JSON.stringify({
          item: item
        })
      };
    } catch (error) {
      logger.error(error.message, { createItemRequest: createItemRequest });
      return generateErrorResponse(500, error.message);
    }
  }
);

handler.use(
  cors({
    credentials: true
  })
);
