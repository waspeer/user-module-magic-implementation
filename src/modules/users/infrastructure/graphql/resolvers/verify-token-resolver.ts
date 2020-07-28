import type { CreateSessionFeature } from '../../../application/features/create-session-feature';
import { InvalidTokenError } from '../../../domain/errors/invalid-token-error';
import { TokenExpiredError } from '../../../domain/errors/token-expired-error';
import { UserMapper } from '../../mappers/user-mapper';
import type { MutationVerifyTokenArgs, VerifyTokenResult } from '../../types/graphql/generated';
import type { Resolver } from '../../types/graphql/resolver';
import { CatchResolverError } from './helpers/catch-resolver-error';
import { UnexpectedError } from '~lib/errors/unexpected-error';
import type { Logger } from '~lib/logger';

interface Dependencies {
  logger: Logger;
  createSessionFeature: CreateSessionFeature;
}

type Result = Partial<VerifyTokenResult>;

export class VerifyTokenResolver implements Resolver<MutationVerifyTokenArgs, Result> {
  private readonly logger: Logger;
  private readonly createSessionFeature: CreateSessionFeature;

  public constructor({ logger, createSessionFeature }: Dependencies) {
    this.logger = logger;
    this.createSessionFeature = createSessionFeature;
  }

  @CatchResolverError
  public async resolve({ token }: MutationVerifyTokenArgs): Promise<Result> {
    this.logger.debug("VerifyTokenResolver: received request to verify token '%s'", token);

    const user = await this.createSessionFeature.execute({ token });

    return {
      __typename: 'VerifyTokenPayload',
      userId: user.id.value,
      user: UserMapper.toPresentation(user),
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
