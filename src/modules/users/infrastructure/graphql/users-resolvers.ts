import { Resolvers } from '../types/graphql/generated';
import { GraphQLResolvers } from '../types/graphql/graphql-resolvers';
import { SignInResolver } from './resolvers/sign-in-resolver';

interface Dependencies {
  signInResolver: SignInResolver;
}

export class UsersResolvers implements GraphQLResolvers {
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
