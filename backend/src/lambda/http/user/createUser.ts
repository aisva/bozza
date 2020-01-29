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

const logger = createLogger('createUser');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event', event);
    const body = JSON.parse(event.body);
    const username = prepareUsername(body.username);
    const password = preparePassword(body.password);
    if (!isValidUsername(username)) {
      logger.error('Invalid username', { username: body.username });
      return generateErrorResponse(400, 'Invalid username');
    }
    if (!isValidPassword(password)) {
      logger.error('Invalid password', { username: body.username });
      return generateErrorResponse(400, 'Invalid password');
    }
    const existingUser = await getUser(username);
    if (existingUser != null) {
      logger.error('User already exists', { username: username });
      return generateErrorResponse(400, 'User already exists');
    }
    const user = await createUser(body);
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
