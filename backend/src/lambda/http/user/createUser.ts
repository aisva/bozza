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
    logger.info('Processing event', event);
    const createUserRequest: CreateUserRequest = JSON.parse(event.body);
    const username = prepareUsername(createUserRequest.username);
    const password = preparePassword(createUserRequest.password);
    if (!isValidUsername(username)) {
      logger.error('Invalid username', { username: createUserRequest.username });
      return generateErrorResponse(400, 'Invalid username');
    }
    if (!isValidPassword(password)) {
      logger.error('Invalid password', { username: createUserRequest.username });
      return generateErrorResponse(400, 'Invalid password');
    }
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
  }
);

handler.use(
  cors({
    credentials: true
  })
);
