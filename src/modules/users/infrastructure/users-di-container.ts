import path from 'path';
import { PrismaClient } from '@prisma/client';
import type { AwilixContainer } from 'awilix';
import { asClass, asFunction, asValue, createContainer } from 'awilix';
import { SignInFeature } from '../application/features/sign-in-feature';
import type { UserRepository } from '../domain/repositories/user-repository';
import { createUsersSchema } from './graphql/create-users-schema';
import { SignInResolver } from './graphql/resolvers/sign-in-resolver';
import { UsersResolvers } from './graphql/users-resolvers';
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

      // REPOSITORIES
      prismaClient: asValue(new PrismaClient()),
      userRepository: asClass<UserRepository>(PrismaUserRepository),

      /**
       * APPLICATION
       */

      // FEATURES
      signInFeature: asClass(SignInFeature),
    });
  }

  public get<T>(name: string) {
    return this.container.resolve<T>(name);
  }
}
