// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLResolveInfo } from 'graphql';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Error = {
  message: Scalars['String'];
};

export type InvalidTokenError = Error & {
  __typename?: 'InvalidTokenError';
  message: Scalars['String'];
};

export type MeResult = User | UnauthorizedError;

export type Mutation = {
  __typename?: 'Mutation';
  /** Send email with magic link */
  SignIn: SignInResult;
  /** Verify the token sent by email */
  VerifyToken: VerifyTokenResult;
};

export type MutationSignInArgs = {
  credentials: SignInInput;
};

export type MutationVerifyTokenArgs = {
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Authenticated query to fetch the current user information */
  me: MeResult;
};

export type SignInInput = {
  email: Scalars['String'];
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  userId: Scalars['ID'];
};

export type SignInResult = SignInPayload | ValidationError;

export type TokenExpiredError = Error & {
  __typename?: 'TokenExpiredError';
  message: Scalars['String'];
};

export type UnauthorizedError = Error & {
  __typename?: 'UnauthorizedError';
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
};

export type ValidationError = Error & {
  __typename?: 'ValidationError';
  message: Scalars['String'];
};

export type VerifyTokenPayload = {
  __typename?: 'VerifyTokenPayload';
  userId: Scalars['ID'];
  user: User;
};

export type VerifyTokenResult = VerifyTokenPayload | InvalidTokenError | TokenExpiredError;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  MeResult: ResolversTypes['User'] | ResolversTypes['UnauthorizedError'];
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UnauthorizedError: ResolverTypeWrapper<UnauthorizedError>;
  Error:
    | ResolversTypes['UnauthorizedError']
    | ResolversTypes['ValidationError']
    | ResolversTypes['InvalidTokenError']
    | ResolversTypes['TokenExpiredError'];
  Mutation: ResolverTypeWrapper<{}>;
  SignInInput: SignInInput;
  SignInResult: ResolversTypes['SignInPayload'] | ResolversTypes['ValidationError'];
  SignInPayload: ResolverTypeWrapper<SignInPayload>;
  ValidationError: ResolverTypeWrapper<ValidationError>;
  VerifyTokenResult:
    | ResolversTypes['VerifyTokenPayload']
    | ResolversTypes['InvalidTokenError']
    | ResolversTypes['TokenExpiredError'];
  VerifyTokenPayload: ResolverTypeWrapper<VerifyTokenPayload>;
  InvalidTokenError: ResolverTypeWrapper<InvalidTokenError>;
  TokenExpiredError: ResolverTypeWrapper<TokenExpiredError>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  MeResult: ResolversParentTypes['User'] | ResolversParentTypes['UnauthorizedError'];
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  UnauthorizedError: UnauthorizedError;
  Error:
    | ResolversParentTypes['UnauthorizedError']
    | ResolversParentTypes['ValidationError']
    | ResolversParentTypes['InvalidTokenError']
    | ResolversParentTypes['TokenExpiredError'];
  Mutation: {};
  SignInInput: SignInInput;
  SignInResult: ResolversParentTypes['SignInPayload'] | ResolversParentTypes['ValidationError'];
  SignInPayload: SignInPayload;
  ValidationError: ValidationError;
  VerifyTokenResult:
    | ResolversParentTypes['VerifyTokenPayload']
    | ResolversParentTypes['InvalidTokenError']
    | ResolversParentTypes['TokenExpiredError'];
  VerifyTokenPayload: VerifyTokenPayload;
  InvalidTokenError: InvalidTokenError;
  TokenExpiredError: TokenExpiredError;
  Boolean: Scalars['Boolean'];
};

export type ErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']
> = {
  __resolveType: TypeResolveFn<
    'UnauthorizedError' | 'ValidationError' | 'InvalidTokenError' | 'TokenExpiredError',
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type InvalidTokenErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InvalidTokenError'] = ResolversParentTypes['InvalidTokenError']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MeResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MeResult'] = ResolversParentTypes['MeResult']
> = {
  __resolveType: TypeResolveFn<'User' | 'UnauthorizedError', ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  SignIn?: Resolver<
    ResolversTypes['SignInResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, 'credentials'>
  >;
  VerifyToken?: Resolver<
    ResolversTypes['VerifyTokenResult'],
    ParentType,
    ContextType,
    RequireFields<MutationVerifyTokenArgs, 'token'>
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  me?: Resolver<ResolversTypes['MeResult'], ParentType, ContextType>;
};

export type SignInPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SignInPayload'] = ResolversParentTypes['SignInPayload']
> = {
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SignInResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SignInResult'] = ResolversParentTypes['SignInResult']
> = {
  __resolveType: TypeResolveFn<'SignInPayload' | 'ValidationError', ParentType, ContextType>;
};

export type TokenExpiredErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TokenExpiredError'] = ResolversParentTypes['TokenExpiredError']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UnauthorizedErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UnauthorizedError'] = ResolversParentTypes['UnauthorizedError']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ValidationErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ValidationError'] = ResolversParentTypes['ValidationError']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VerifyTokenPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VerifyTokenPayload'] = ResolversParentTypes['VerifyTokenPayload']
> = {
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VerifyTokenResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VerifyTokenResult'] = ResolversParentTypes['VerifyTokenResult']
> = {
  __resolveType: TypeResolveFn<
    'VerifyTokenPayload' | 'InvalidTokenError' | 'TokenExpiredError',
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Error?: ErrorResolvers;
  InvalidTokenError?: InvalidTokenErrorResolvers<ContextType>;
  MeResult?: MeResultResolvers;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignInPayload?: SignInPayloadResolvers<ContextType>;
  SignInResult?: SignInResultResolvers;
  TokenExpiredError?: TokenExpiredErrorResolvers<ContextType>;
  UnauthorizedError?: UnauthorizedErrorResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ValidationError?: ValidationErrorResolvers<ContextType>;
  VerifyTokenPayload?: VerifyTokenPayloadResolvers<ContextType>;
  VerifyTokenResult?: VerifyTokenResultResolvers;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
