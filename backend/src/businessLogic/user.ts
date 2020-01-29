import * as uuid from 'uuid';
import { createLogger } from '../utils/logger';
import { User } from '../models/User';
import { UserAccess } from '../dataLayer/userAccess';
import { CreateUserRequest } from '../requests/CreateUserRequest';
import { generatePassword } from '../utils/encryption';

const logger = createLogger('userBusinessLogic');
const userAccess = new UserAccess();
const usernameLength = { max: 15, min: 3 };
const passwordLength = { max: 15, min: 8 };

export async function createUser(createUserRequest: CreateUserRequest): Promise<User> {
  const userId: string = uuid.v4();
  logger.info('Creating a user', { userId: userId });
  const password = await generatePassword(createUserRequest.password);
  return await userAccess.createUser({
    userId,
    username: createUserRequest.username,
    password,
    createdAt: new Date().toISOString()
  });
}

export async function getUser(username: string): Promise<User> {
  logger.info('Getting user', { username: username });
  return userAccess.getUser(username);
}

export function prepareUsername(username: string): string {
  return username.trim();
}

export function isValidUsername(username: string): boolean {
  return username.length > usernameLength.max || username.length < usernameLength.min ? false : true;
}

export function preparePassword(password: string): string {
  return password.trim();
}

export function isValidPassword(password: string): boolean {
  return password.length > passwordLength.max || password.length < passwordLength.min ? false : true;
}
