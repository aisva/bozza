import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import {
  prepareUsername,
  isValidUsername,
  preparePassword,
  isValidPassword,
  getUser
} from '../../../businessLogic/user';
import { createLogger } from '../../../utils/logger';
import { generateToken } from '../../../utils/authentication';
import { generateErrorResponse } from '../../../utils/response';
import { comparePasswords } from '../../../utils/encryption';
import { SignInUserRequest } from '../../../requests/SignInUserRequest';

const logger = createLogger('signInUser');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const signInUserRequest: SignInUserRequest = JSON.parse(event.body);
    const username = prepareUsername(signInUserRequest.username);
    logger.info('Processing request', { username: username });
    if (!isValidUsername(username)) {
      logger.error('Invalid username', { username: username });
      return generateErrorResponse(400, 'Invalid username');
    }
    const password = preparePassword(signInUserRequest.password);
    if (!isValidPassword(password)) {
      logger.error('Invalid password', { username: username });
      return generateErrorResponse(400, 'Invalid password');
    }
    try {
      const user = await getUser(username);
      if (user == null) {
        logger.error('Unauthorized user', { username: username });
        return generateErrorResponse(401, 'Unauthorized user');
      }
      const matchingPasswords = await comparePasswords(password, user.password);
      if (!matchingPasswords) {
        logger.error('Unauthorized user', { username: username });
        return generateErrorResponse(401, 'Unauthorized user');
      }
      return {
        statusCode: 201,
        body: JSON.stringify({
          token: generateToken(user)
        })
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
