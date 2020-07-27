import type { FindUserByIdFeature } from '../../application/features/find-user-by-id-feature';
import { UserMapper } from '../mappers/user-mapper';
import type { Resolvers, User as GraphQLUser } from '../types/graphql/generated';
import type { GraphQLResolvers } from '../types/graphql/graphql-resolvers';
import type { SignInResolver } from './resolvers/sign-in-resolver';
import type { VerifyTokenResolver } from './resolvers/verify-token-resolver';

interface Dependencies {
  findUserByIdFeature: FindUserByIdFeature;
  signInResolver: SignInResolver;
  verifyTokenResolver: VerifyTokenResolver;
}

export class UsersResolvers implements GraphQLResolvers {
  private readonly findUserByIdFeature: FindUserByIdFeature;
  private readonly signInResolver: SignInResolver;
  private readonly verifyTokenResolver: VerifyTokenResolver;

  public constructor({ findUserByIdFeature, signInResolver, verifyTokenResolver }: Dependencies) {
    this.findUserByIdFeature = findUserByIdFeature;
    this.signInResolver = signInResolver;
    this.verifyTokenResolver = verifyTokenResolver;
  }

  public generate(): Resolvers {
    return {
      Mutation: {
        SignIn: (_, args) => this.signInResolver.resolve(args),
        VerifyToken: (_, args) => this.verifyTokenResolver.resolve(args),
      },
      VerifyTokenPayload: {
        user: async ({ userId }): Promise<GraphQLUser> => {
          const userOrUndefined = await this.findUserByIdFeature.execute({ userId });

          if (userOrUndefined === undefined) {
            throw new Error('UsersResolvers: unable to find user in VerifyTokenPayload');
          }

          return UserMapper.toPresentation(userOrUndefined);
        },
      },
    };
  }
}
