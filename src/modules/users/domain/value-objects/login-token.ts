import jwt from 'jsonwebtoken';
import type { User } from '../entities/user';
import { getEnvironmentVariable } from '~lib/helpers/get-environment-variable';

export class LoginToken {
  static readonly Lifetime = 3600;

  public readonly value: string;

  public constructor(user: User) {
    const secret = getEnvironmentVariable('JWT_SECRET');

    this.value = jwt.sign({ userId: user.id.value }, secret, { expiresIn: LoginToken.Lifetime });
  }
}