import { createLogger } from '../../utils/logger';
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda';
import { verifyToken } from '../../utils/authentication';

const logger = createLogger('authorizer');

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', { token: event.authorizationToken });
  try {
    const tokenPayload = verifyToken(event.authorizationToken);
    logger.info('User authorized', tokenPayload);
    return {
      principalId: tokenPayload.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    };
  } catch (error) {
    logger.error('User not authorized', { error: error.message });
    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    };
  }
};
