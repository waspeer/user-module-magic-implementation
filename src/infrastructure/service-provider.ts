import { asClass, asValue, createContainer } from 'awilix';
import type { AwilixContainer } from 'awilix';
import { SignInFeature } from '../application/features/sign-in-feature';
import { getEnvironmentVariable } from '../lib/helpers/get-environment-variable';
import type { Logger } from '../lib/logger';
import { GraphQLResolvers } from './graphql/graphql-resolvers';
import { GraphQLServer } from './graphql/graphql-server';
import type { GraphQLServerConfig } from './graphql/graphql-server';
import { SignInResolver } from './graphql/resolvers/sign-in-resolver';
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
