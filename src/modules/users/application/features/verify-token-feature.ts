import { LoginToken } from '../../domain/value-objects/login-token';
import type { Feature } from '~lib/application/feature';
import type { Logger } from '~lib/logger';

interface Dependencies {
  logger: Logger;
}

interface Arguments {
  token: string;
}

interface Result {
  userId: string;
}

export class VerifyTokenFeature implements Feature<Arguments, Result> {
  private readonly logger: Logger;

  public constructor({ logger }: Dependencies) {
    this.logger = logger;
  }

  public async execute({ token }: Arguments): Promise<Result> {
    try {
      return LoginToken.verify(token);
    } catch (error) {
      this.logger.debug('VerifyTokenFeature: token was invalid: %s', error.message);

      throw error;
    }
  }
}
