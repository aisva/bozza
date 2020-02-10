export interface User {
  userId: string;
  username: string;
  password: string;
  tags?: Array<string>;
  receivers?: Array<string>;
  createdAt: string;
  updatedAt?: string;
}
