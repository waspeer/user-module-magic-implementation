import type { SignInFeature } from '../../../application/features/sign-in-feature';
import { UnexpectedError } from '../../../lib/errors/unexpected-error';
import type { Logger } from '../../../lib/logger';
import { ValidationError } from '../../../lib/validate/validation-error';
import type { MutationSignInArgs, SignInResult } from '../../types/graphql/generated';
import type { Resolver } from '../../types/graphql/resolver';
import { CatchResolverError } from './helpers/catch-resolver-error';

interface Dependencies {
  logger: Logger;
  signInFeature: SignInFeature;
}

export class SignInResolver implements Resolver<MutationSignInArgs, SignInResult> {
  private readonly logger: Logger;
  private readonly signInFeature: SignInFeature;

  public constructor({ logger, signInFeature }: Dependencies) {
    this.logger = logger;
    this.signInFeature = signInFeature;
  }

  @CatchResolverError()
  public async resolve({ credentials: { email } }: MutationSignInArgs): Promise<SignInResult> {
    this.logger.debug("SignInResolver: received request to sign in user with email '%s'", email);

    await this.signInFeature.execute({ email });

    return {
      __typename: 'SignInPayload',
      userId: 'id', // TODO add query function
    };
  }

  public handleError(error: Error): SignInResult {
    switch (error.constructor) {
      case ValidationError:
        return {
          __typename: 'ValidationError',
          message: error.message,
        };
      default:
        this.logger.error('SignInResolver: an unexpected error occurred: %s', error.message);

        throw new UnexpectedError(error);
    }
  }
}
