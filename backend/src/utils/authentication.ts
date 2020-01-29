import { User } from '../models/User';
import * as jwt from 'jsonwebtoken';

const secret = process.env.TOKEN_SECRET;

export function generateToken(user: User): string {
  const payload = { userId: user.userId, username: user.username };
  return jwt.sign(payload, secret);
}
