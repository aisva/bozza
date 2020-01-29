import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import {
  createUser,
  prepareUsername,
  isValidUsername,
  preparePassword,
  isValidPassword,
  getUser
} from '../../../businessLogic/user';
import { createLogger } from '../../../utils/logger';
import { generateToken } from '../../../utils/authentication';
import { generateErrorResponse } from '../../../utils/response';
import { CreateUserRequest } from '../../../requests/CreateUserRequest';

const logger = createLogger('createUser');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const createUserRequest: CreateUserRequest = JSON.parse(event.body);
    const username = prepareUsername(createUserRequest.username);
    logger.info('Processing request', { username: username });
    if (!isValidUsername(username)) {
      logger.error('Invalid username', { username: createUserRequest.username });
      return generateErrorResponse(400, 'Invalid username');
    }
    const password = preparePassword(createUserRequest.password);
    if (!isValidPassword(password)) {
      logger.error('Invalid password', { username: createUserRequest.username });
      return generateErrorResponse(400, 'Invalid password');
    }
    try {
      const existingUser = await getUser(username);
      if (existingUser != null) {
        logger.error('User already exists', { username: username });
        return generateErrorResponse(400, 'User already exists');
      }
      const user = await createUser(createUserRequest);
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
