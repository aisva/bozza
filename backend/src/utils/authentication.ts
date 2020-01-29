import { User } from '../models/User';
import * as jwt from 'jsonwebtoken';
import { decode, verify } from 'jsonwebtoken';

const secret = process.env.TOKEN_SECRET;

export interface Payload {
  sub: string;
  username: string;
  iat?: number;
  exp?: number;
}

export function generateToken(user: User): string {
  const payload: Payload = { sub: user.userId, username: user.username };
  return jwt.sign(payload, secret, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });
}

function getToken(authenticationHeader: string): string {
  if (authenticationHeader == null) throw new Error('Missing authentication header');
  if (!authenticationHeader.toLowerCase().startsWith('bearer ')) throw new Error('Invalid authentication header');
  return authenticationHeader.split(' ')[1];
}

function getPayload(token: string): Payload {
  return decode(token) as Payload;
}

export function verifyToken(authenticationHeader: string): Payload {
  const token = getToken(authenticationHeader);
  verify(token, secret);
  return getPayload(token);
}

export function getUserId(token: string): string {
  return this.getPayload(token).sub;
}
