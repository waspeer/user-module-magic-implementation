import { PrismaClient } from '@prisma/client';
import { asClass, asValue, createContainer } from 'awilix';
import type { AwilixContainer } from 'awilix';
import { AfterUserLoginTokenCreated } from '../application/event-handlers/after-user-login-token-created';
import { SignInFeature } from '../application/features/sign-in-feature';
import type { UserRepository } from '../domain/repositories/user-repository';
import { DomainEventEmitter } from '../lib/events/domain-event-emitter';
import { getEnvironmentVariable } from '../lib/helpers/get-environment-variable';
import type { Logger } from '../lib/logger';
import { GraphQLResolvers } from './graphql/graphql-resolvers';
import { GraphQLServer } from './graphql/graphql-server';
import type { GraphQLServerConfig } from './graphql/graphql-server';
import { SignInResolver } from './graphql/resolvers/sign-in-resolver';
import { PrismaUserRepository } from './repositories/prisma-user-repository';
import type { Server } from './types/server';
import { WinstonLogger } from './winston-logger';

export class ServiceProvider {
  private readonly container: AwilixContainer;

  public constructor() {
    this.container = createContainer();
    this.container.register({
      /**
       * CONFIG
       */
      serverConfig: asValue<GraphQLServerConfig>({
        port: +getEnvironmentVariable('PORT', '4444'),
      }),

      /**
       * INFRASTRUCTURE
       */

      // GENERAL
      logger: asClass<Logger>(WinstonLogger),

      // GRAPHQL
      resolvers: asClass(GraphQLResolvers),
      server: asClass<Server>(GraphQLServer),
      signInResolver: asClass(SignInResolver),

      // REPOSITORIES
      prismaClient: asValue(new PrismaClient()),
      userRepository: asClass<UserRepository>(PrismaUserRepository),

      /**
       * APPLICATION
       */

      // FEATURES
      signInFeature: asClass(SignInFeature),

      /**
       * EVENTS
       */
      domainEventEmitter: asClass(DomainEventEmitter).singleton(),
      afterUserLoginTokenCreated: asClass(AfterUserLoginTokenCreated).singleton(),
    });
  }

  public get<T>(name: string) {
    return this.container.resolve<T>(name);
  }
}
