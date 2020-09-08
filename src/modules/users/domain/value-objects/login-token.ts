import jwt, { TokenExpiredError as JWTTokenExpiredError } from 'jsonwebtoken';
import type { User } from '../entities/user';
import { InvalidTokenError } from '../errors/invalid-token-error';
import { TokenExpiredError } from '../errors/token-expired-error';
import { getEnvironmentVariable } from '~lib/helpers/get-environment-variable';

// TODO add correlationID/SessionID with which can be checked if the token was already used

interface TokenPayload {
  userId: string;
}

const JWT_SECRET = getEnvironmentVariable('JWT_SECRET');

export class LoginToken {
  static readonly Lifetime = 3600;

  public readonly value: string;

  public constructor(user: User) {
    const payload: TokenPayload = { userId: user.id.value };

    this.value = jwt.sign(payload, JWT_SECRET, {
      expiresIn: LoginToken.Lifetime,
    });
  }

  static verify(token: string) {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;

      if (!payload.userId) {
        throw new InvalidTokenError();
      }

      return payload;
    } catch (error) {
      if (error instanceof JWTTokenExpiredError) {
        throw new TokenExpiredError();
      }

      throw new InvalidTokenError();
    }
  }
}
