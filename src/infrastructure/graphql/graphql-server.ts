import { ApolloServer, mergeSchemas } from 'apollo-server-express';
import express from 'express';
import type { Express } from 'express';
import type { GraphQLSchema } from 'graphql';
import type { Server } from '../types/server';
import type { ServerMiddleware } from '../types/server-middleware';
import { getEnvironmentVariable } from '~lib/helpers/get-environment-variable';
import type { Logger } from '~lib/logger';

export interface GraphQLServerConfig {
  port: number;
}

interface Dependencies {
  middleware: ServerMiddleware[];
  logger: Logger;
  schemas: GraphQLSchema[];
  serverConfig: GraphQLServerConfig;
}

const IS_DEVELOPMENT = getEnvironmentVariable('NODE_ENV', '') === 'development';

export class GraphQLServer implements Server {
  private readonly config: GraphQLServerConfig;
  private readonly logger: Logger;
  public readonly express: Express;

  public constructor({ middleware, logger, schemas, serverConfig }: Dependencies) {
    this.config = serverConfig;
    this.logger = logger;

    const app = express();
    const server = new ApolloServer({
      schema: mergeSchemas({ schemas }),
      playground: IS_DEVELOPMENT,
    });

    server.applyMiddleware({ app });
    middleware.forEach((mw) => mw.apply(app));

    this.express = app;
  }

  public async start() {
    const { port } = this.config;
    const server = this.express.listen({ port }, () => {
      this.logger.info(`Server running on http://localhost:${port}/graphql`);
    });

    ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException'].forEach((event) =>
      process.on(event, () => server.close()),
    );
  }
}
