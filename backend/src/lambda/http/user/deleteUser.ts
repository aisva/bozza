import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../../utils/logger';
import { getUsername } from '../../../utils/authentication';
import { generateErrorResponse } from '../../../utils/response';
import { deleteUser, getUser } from '../../../businessLogic/user/user';

const logger = createLogger('deleteUser');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const username = getUsername(event);
    logger.info('Processing request', { username: username });
    try {
      const user = await getUser(username);
      if (user == null) {
        logger.error('User does not exist', { username: username });
        return generateErrorResponse(400, 'User does not exist');
      }
      await deleteUser(username);
      return {
        statusCode: 204,
        body: null
      };
    } catch (error) {
      logger.error(error.message, { username: username });
      return generateErrorResponse(500, error.message);
    }
  }
);

handler.use(
  cors({
    credentials: true
  })
);
