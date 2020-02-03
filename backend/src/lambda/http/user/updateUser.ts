import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { preparePassword, isValidPassword, getUser, updateUser } from '../../../businessLogic/user/user';
import { createLogger } from '../../../utils/logger';
import { getUsername } from '../../../utils/authentication';
import { generateErrorResponse } from '../../../utils/response';
import { comparePasswords } from '../../../utils/encryption';
import { UpdateUserRequest } from '../../../requests/UpdateUserRequest';

const logger = createLogger('updateUser');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const username = getUsername(event);
    logger.info('Processing request', { username: username });
    const updateUserRequest: UpdateUserRequest = JSON.parse(event.body);
    const currentPassword = preparePassword(updateUserRequest.currentPassword);
    if (!isValidPassword(currentPassword)) {
      logger.error('Current password is malformed', { username: username });
      return generateErrorResponse(400, 'Current password is malformed');
    }
    try {
      const user = await getUser(username);
      const matchingPasswords = await comparePasswords(currentPassword, user.password);
      if (!matchingPasswords) {
        logger.error('Current password is not valid', { username: username });
        return generateErrorResponse(400, 'Current password is not valid');
      }
      const newPassword = preparePassword(updateUserRequest.newPassword);
      if (!isValidPassword(newPassword)) {
        logger.error('New password is malformed', { username: username });
        return generateErrorResponse(400, 'New password is malformed');
      }
      await updateUser(updateUserRequest, username);
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
