import { ApolloServer, mergeSchemas } from 'apollo-server-express';
import express from 'express';
import type { Express } from 'express';
import type { GraphQLSchema } from 'graphql';
import type { Server } from '../types/server';
import { getEnvironmentVariable } from '~lib/helpers/get-environment-variable';
import type { Logger } from '~lib/logger';

export interface GraphQLServerConfig {
  port: number;
}

interface Dependencies {
  logger: Logger;
  schemas: GraphQLSchema[];
  serverConfig: GraphQLServerConfig;
}

const IS_DEVELOPMENT = getEnvironmentVariable('NODE_ENV', '') === 'development';

export class GraphQLServer implements Server {
  private readonly config: GraphQLServerConfig;
  private readonly logger: Logger;
  public readonly express: Express;

  public constructor({ logger, schemas, serverConfig }: Dependencies) {
    this.config = serverConfig;
    this.logger = logger;

    const app = express();
    const server = new ApolloServer({
      schema: mergeSchemas({ schemas }),
      playground: IS_DEVELOPMENT,
    });

    server.applyMiddleware({ app });

    this.express = app;
  }

  public async start() {
    const { port } = this.config;

    this.express.listen({ port }, () => {
      this.logger.info(`Server running on http://localhost:${port}/graphql`);
    });
  }
}
