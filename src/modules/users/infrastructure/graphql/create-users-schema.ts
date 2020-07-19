import type { GraphQLSchema } from 'graphql';
import { addResolversToSchema, GraphQLFileLoader, loadSchemaSync } from 'graphql-tools';
import type { GraphQLResolvers } from '../types/graphql/graphql-resolvers';
import { Logger } from '~lib/logger';

interface Props {
  logger: Logger;
  resolvers: GraphQLResolvers;
  schemaPath: string;
}

export function createUsersSchema({ logger, resolvers, schemaPath }: Props): GraphQLSchema {
  const schema = loadSchemaSync(schemaPath, {
    loaders: [new GraphQLFileLoader()],
    logger: { log: logger.error },
  });

  return addResolversToSchema(schema, resolvers.generate());
}
