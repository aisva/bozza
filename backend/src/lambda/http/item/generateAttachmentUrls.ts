import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../../utils/logger';
import { getUserId } from '../../../utils/authentication';
import { generateErrorResponse } from '../../../utils/response';
import { getItem, updateDownloadUrl, getUploadUrl } from '../../../businessLogic/item/item';
import { getDownloadUrl } from '../../../utils/dataStorage';

const logger = createLogger('generateAttachmentUrls');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const itemId = event.pathParameters != null ? event.pathParameters.itemId : null;
    logger.info('Processing request', { itemId: itemId });
    if (itemId == null) {
      logger.error('Invalid item id', { itemId: itemId });
      return generateErrorResponse(400, 'Invalid item id');
    }
    try {
      const userId = getUserId(event);
      const item = await getItem(itemId, userId);
      if (item == null) {
        logger.error('Unable to fetch item', { itemId: itemId, userId: userId });
        return generateErrorResponse(404, 'Unable to fetch item');
      }
      await updateDownloadUrl(itemId, userId);
      return {
        statusCode: 201,
        body: JSON.stringify({
          uploadUrl: getUploadUrl(itemId),
          downloadUrl: getDownloadUrl(itemId)
        })
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
