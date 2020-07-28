import path from 'path';
import { PrismaClient } from '@prisma/client';
import type { AwilixContainer } from 'awilix';
import { asClass, asFunction, asValue, createContainer } from 'awilix';
import { CreateSessionFeature } from '../application/features/create-session-feature';
import { FindUserByIdFeature } from '../application/features/find-user-by-id-feature';
import { SignInFeature } from '../application/features/sign-in-feature';
import type { SessionRepository } from '../domain/repositories/session-repository';
import type { UserRepository } from '../domain/repositories/user-repository';
import { createUsersSchema } from './graphql/create-users-schema';
import { SignInResolver } from './graphql/resolvers/sign-in-resolver';
import { VerifyTokenResolver } from './graphql/resolvers/verify-token-resolver';
import { UsersResolvers } from './graphql/users-resolvers';
import { PrismaSessionRepository } from './repositories/prisma-session-repository';
import { PrismaUserRepository } from './repositories/prisma-user-repository';
import type { DIContainer } from '~lib/infrastructure/di-container';
import type { Logger } from '~lib/logger';
import type { AppDomainEventEmitter } from '~root/events/app-domain-event-emitter';

interface Dependencies {
  domainEventEmitter: AppDomainEventEmitter;
  logger: Logger;
}

export class UsersDIContainer implements DIContainer {
  private readonly container: AwilixContainer;

  public constructor({ domainEventEmitter, logger }: Dependencies) {
    this.container = createContainer();
    this.container.register({
      /**
       * INFRASTRUCTURE
       */

      // GENERAL
      domainEventEmitter: asValue(domainEventEmitter),
      logger: asValue(logger),

      // GRAPHQL
      graphQLSchema: asFunction(createUsersSchema),
      resolvers: asClass(UsersResolvers),
      schemaPath: asValue(path.resolve(__dirname, 'graphql/users-schema.graphql')),
      signInResolver: asClass(SignInResolver),
      verifyTokenResolver: asClass(VerifyTokenResolver),

      // REPOSITORIES
      prismaClient: asValue(new PrismaClient()),
      sessionRepository: asClass<SessionRepository>(PrismaSessionRepository),
      userRepository: asClass<UserRepository>(PrismaUserRepository),

      /**
       * APPLICATION
       */

      // FEATURES
      createSessionFeature: asClass(CreateSessionFeature),
      findUserByIdFeature: asClass(FindUserByIdFeature),
      signInFeature: asClass(SignInFeature),
    });
  }

  public get<T>(name: string) {
    return this.container.resolve<T>(name);
  }
}
