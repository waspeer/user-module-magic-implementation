import { asClass, asFunction, asValue, createContainer } from 'awilix';
import type { AwilixContainer } from 'awilix';
import { MailDIContainer } from '../modules/mail/mail-di-container';
import { UsersDIContainer } from '../modules/users/infrastructure/users-di-container';
import { GraphQLServer } from './graphql/graphql-server';
import type { GraphQLServerConfig } from './graphql/graphql-server';
import type { Server } from './types/server';
import { WinstonLogger } from './winston-logger';
import { DomainEventEmitter } from '~lib/events/domain-event-emitter';
import { getEnvironmentVariable } from '~lib/helpers/get-environment-variable';
import type { DIContainer } from '~lib/infrastructure/di-container';
import type { Logger } from '~lib/logger';

export class AppDIContainer implements DIContainer {
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
       * MODULES
       */
      mailDIContainer: asClass(MailDIContainer).singleton(),
      usersDIContainer: asClass(UsersDIContainer).singleton(),

      /**
       * GENERAL
       */
      domainEventEmitter: asClass(DomainEventEmitter).singleton(),
      logger: asClass<Logger>(WinstonLogger),

      /**
       * INFRASTRUCTURE
       */
      // GRAPHQL
      schemas: asFunction(({ usersDIContainer }: any) => [usersDIContainer.get('graphQLSchema')]),
      server: asClass<Server>(GraphQLServer),
    });

    // Construct module DI containers in order to start registration
    this.get('mailDIContainer');
    this.get('usersDIContainer');
  }

  public get<T>(name: string) {
    return this.container.resolve<T>(name);
  }
}
