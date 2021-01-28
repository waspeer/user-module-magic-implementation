import {
  DirectiveLocation,
  GraphQLField,
  GraphQLResolveInfo,
  GraphQLSchema as Schema,
} from 'graphql';

import { AnyObject } from '~lib/helpers/helper-types';

///
// UTILITY
///

/** The object that contains all the dependencies that need to be injected for the schema */
type Cradle = any;

///
// DIRECTIVE
///

interface SchemaTransformer<T> {
  (config: T, arguments_: AnyObject): T | void;
}

interface TransformerMap {
  [DirectiveLocation.FIELD_DEFINITION]: SchemaTransformer<GraphQLField<any, any>>;
  // Can easily be extended in the future
  // https://www.graphql-tools.com/docs/schema-directives#full-mapschema-api
}

interface GraphQLDirective {
  /** The names this directive has in the schema */
  names: string[];

  /** The typeDef needed to add this directive to the schema */
  typeDef: string;

  /** The schema transformers that implement the directive */
  transformers: Partial<TransformerMap>;
}

interface GraphQLDirectiveClass {
  new (cradle: Cradle): GraphQLDirective;
}

///
// RESOLVER
///

/**
 * A resolver function. This interface should be compatible with those generated with https://graphql-code-generator.com
 * Make sure the option `noSchemaStitching` is set to true.
 */
type ResolverFunction<
  TResult = unknown,
  TParent extends AnyObject = any,
  TContext extends AnyObject = any,
  TArguments extends AnyObject = any
> = (
  parent: TParent,
  arguments_: TArguments,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

/** Infers the result of a ResolverFunction */
type ResolverResult<R extends ResolverFunction> = R extends ResolverFunction<infer T, any, any, any>
  ? T
  : unknown;

/** Infers the parent parameter of a ResolverFunction */
type ResolverParent<R extends ResolverFunction> = R extends ResolverFunction<any, infer T, any, any>
  ? T
  : unknown;

/** Infers the context parameter of a ResolverFunction */
type ResolverContext<R extends ResolverFunction> = R extends ResolverFunction<
  any,
  any,
  infer T,
  any
>
  ? T
  : unknown;

/** Infers the args parameter of a ResolverFunction */
type ResolverArguments<R extends ResolverFunction> = R extends ResolverFunction<
  any,
  any,
  any,
  infer T
>
  ? T
  : unknown;

interface GraphQLResolver<
  TResult = unknown,
  TParent extends AnyObject = any,
  TArguments extends AnyObject = any,
  TContext extends AnyObject = any
> {
  /**
   * The path of the resolver (`[rootType, fieldName]`)
   * eg. `['Query', 'allPosts']`)
   */
  path: Readonly<[string, string]>;

  /**
   * The implementation of the Resolver
   */
  resolve(parent: TParent, arguments_: TArguments, context: TContext): Promise<TResult> | TResult;
}

interface GraphQLResolverClass {
  new (cradle: Cradle): GraphQLResolver<any>;
}

///
// MODULE
///

interface GraphQLModule {
  typeDefs: string[];
  resolvers: GraphQLResolverClass[];
}

///
// SCHEMA
///

interface GraphQLSchema {
  baseTypeDefs: string;
  directives: GraphQLDirectiveClass[];
  modules: GraphQLModule[];

  makeExecutableSchema(): Schema;
}

export {
  SchemaTransformer,
  TransformerMap,
  GraphQLDirective,
  GraphQLDirectiveClass,
  ResolverFunction,
  ResolverResult,
  ResolverParent,
  ResolverContext,
  ResolverArguments,
  GraphQLResolver,
  GraphQLResolverClass,
  GraphQLModule,
  GraphQLSchema,
};
