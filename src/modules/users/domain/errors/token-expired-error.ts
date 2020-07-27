import { Error } from '~lib/errors/error';

export class TokenExpiredError extends Error {
  public constructor() {
    super('Unable to verify token: token has expired', TokenExpiredError);
  }
}
