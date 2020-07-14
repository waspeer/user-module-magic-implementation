import { Resolvers } from '../types/graphql/generated';
import { SignInResolver } from './resolvers/sign-in-resolver';

interface Dependencies {
  signInResolver: SignInResolver;
}

export class GraphQLResolvers {
  private readonly signInResolver: SignInResolver;

  public constructor({ signInResolver }: Dependencies) {
    this.signInResolver = signInResolver;
  }

  public generate(): Resolvers {
    return {
      Mutation: {
        SignIn: (_, args) => this.signInResolver.resolve(args),
      },
    };
  }
}
