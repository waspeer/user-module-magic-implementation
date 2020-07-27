import type { VerifyTokenFeature } from '../../../application/features/verify-token-feature';
import { InvalidTokenError } from '../../../domain/errors/invalid-token-error';
import { TokenExpiredError } from '../../../domain/errors/token-expired-error';
import type { MutationVerifyTokenArgs, VerifyTokenResult } from '../../types/graphql/generated';
import type { Resolver } from '../../types/graphql/resolver';
import { CatchResolverError } from './helpers/catch-resolver-error';
import { UnexpectedError } from '~lib/errors/unexpected-error';
import type { Logger } from '~lib/logger';

interface Dependencies {
  logger: Logger;
  verifyTokenFeature: VerifyTokenFeature;
}

type Result = Partial<VerifyTokenResult>;

export class VerifyTokenResolver implements Resolver<MutationVerifyTokenArgs, Result> {
  private readonly logger: Logger;
  private readonly verifyTokenFeature: VerifyTokenFeature;

  public constructor({ logger, verifyTokenFeature }: Dependencies) {
    this.logger = logger;
    this.verifyTokenFeature = verifyTokenFeature;
  }

  @CatchResolverError
  public async resolve({ token }: MutationVerifyTokenArgs): Promise<Result> {
    this.logger.debug("VerifyTokenResolver: received request to verify token '%s'", token);

    const { userId } = await this.verifyTokenFeature.execute({ token });

    // TODO implement session

    return {
      __typename: 'VerifyTokenPayload',
      userId,
    };
  }

  public handleError(error: Error): VerifyTokenResult {
    switch (error.constructor) {
      case InvalidTokenError:
        return {
          __typename: 'InvalidTokenError',
          message: 'Provided token is invalid',
        };
      case TokenExpiredError:
        return {
          __typename: 'TokenExpiredError',
          message: 'Provided token has expired',
        };
      default:
        this.logger.error(
          'VerifyTokenResolver: the error could not be resolved, type of error was: %s',
          error.constructor.name,
        );

        throw new UnexpectedError(error);
    }
  }
}
