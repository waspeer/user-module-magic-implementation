import path from 'path';
import { GraphQLServer as YogaServer } from 'graphql-yoga';
import { getEnvironmentVariable } from '../../lib/helpers/get-environment-variable';
import type { Logger } from '../../lib/logger';
import type { Server } from '../types/server';
import type { GraphQLResolvers } from './graphql-resolvers';

export interface GraphQLServerConfig {
  port: number;
}

interface Dependencies {
  logger: Logger;
  resolvers: GraphQLResolvers;
  serverConfig: GraphQLServerConfig;
}

const IS_DEVELOPMENT = getEnvironmentVariable('NODE_ENV', '') === 'development';

export class GraphQLServer implements Server {
  private readonly config: GraphQLServerConfig;
  private readonly logger: Logger;
  public readonly server: YogaServer;

  public constructor({ logger, resolvers, serverConfig }: Dependencies) {
    this.config = serverConfig;
    this.logger = logger;
    this.server = new YogaServer({
      typeDefs: path.resolve(__dirname, 'schema.graphql'),
      resolvers: resolvers.generate() as any,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
    });
  }

  public async start() {
    this.server.start(
      {
        endpoint: '/graphql',
        playground: IS_DEVELOPMENT ? '/playground' : false,
        port: this.config.port,
      },
      () => {
        this.logger.info('Server running on http://localhost:%s', this.config.port);
      },
    );
  }
}
