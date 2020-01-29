import * as bcrypt from 'bcryptjs';

export async function generatePassword(plainTextPassword: string): Promise<string> {
  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);
  const hash = await bcrypt.hash(plainTextPassword, salt);
  return hash;
}

export async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hash);
}
