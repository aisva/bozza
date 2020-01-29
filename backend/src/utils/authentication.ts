import { User } from '../models/User';
import * as jwt from 'jsonwebtoken';
import { decode, verify } from 'jsonwebtoken';
import { APIGatewayProxyEvent } from 'aws-lambda';

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

function getToken(authorizationHeader: string): string {
  if (authorizationHeader == null) throw new Error('Missing authorization header');
  if (!authorizationHeader.toLowerCase().startsWith('bearer ')) throw new Error('Invalid authorization header');
  return authorizationHeader.split(' ')[1];
}

export function verifyToken(authorizationHeader: string): Payload {
  const token = getToken(authorizationHeader);
  verify(token, secret);
  return decode(token) as Payload;
}

function getPayload(event: APIGatewayProxyEvent): Payload {
  const authorizationHeader = event.headers.Authorization;
  const token = authorizationHeader.split(' ')[1];
  return decode(token) as Payload;
}

export function getUserId(event: APIGatewayProxyEvent): string {
  return getPayload(event).sub;
}

export function getUsername(event: APIGatewayProxyEvent): string {
  return getPayload(event).username;
}
