import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  /** Authenticated query to fetch the current user information */
  me: MeResult;
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

export type SignInInput = {
  email: Scalars['String'];
};

export type SignInResult = SignInPayload | ValidationError;

export type VerifyTokenResult = VerifyTokenPayload | InvalidTokenError | TokenExpiredError;

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
};

export type UnauthorizedError = Error & {
  __typename?: 'UnauthorizedError';
  message: Scalars['String'];
};

export type Error = {
  message: Scalars['String'];
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  user: User;
  userId: Scalars['ID'];
};

export type ValidationError = Error & {
  __typename?: 'ValidationError';
  message: Scalars['String'];
};

export type VerifyTokenPayload = {
  __typename?: 'VerifyTokenPayload';
  user: User;
  userId: Scalars['ID'];
};

export type InvalidTokenError = Error & {
  __typename?: 'InvalidTokenError';
  message: Scalars['String'];
};

export type TokenExpiredError = Error & {
  __typename?: 'TokenExpiredError';
  message: Scalars['String'];
};

export type TokenAlreadyUsed = Error & {
  __typename?: 'TokenAlreadyUsed';
  message: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<Partial<T>> | Partial<T>;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
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

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  MeResult: ResolversTypes['User'] | ResolversTypes['UnauthorizedError'];
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  SignInInput: SignInInput;
  SignInResult: ResolversTypes['SignInPayload'] | ResolversTypes['ValidationError'];
  VerifyTokenResult: ResolversTypes['VerifyTokenPayload'] | ResolversTypes['InvalidTokenError'] | ResolversTypes['TokenExpiredError'];
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  UnauthorizedError: ResolverTypeWrapper<UnauthorizedError>;
  Error: ResolversTypes['UnauthorizedError'] | ResolversTypes['ValidationError'] | ResolversTypes['InvalidTokenError'] | ResolversTypes['TokenExpiredError'] | ResolversTypes['TokenAlreadyUsed'];
  SignInPayload: ResolverTypeWrapper<SignInPayload>;
  ValidationError: ResolverTypeWrapper<ValidationError>;
  VerifyTokenPayload: ResolverTypeWrapper<VerifyTokenPayload>;
  InvalidTokenError: ResolverTypeWrapper<InvalidTokenError>;
  TokenExpiredError: ResolverTypeWrapper<TokenExpiredError>;
  TokenAlreadyUsed: ResolverTypeWrapper<TokenAlreadyUsed>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  MeResult: ResolversParentTypes['User'] | ResolversParentTypes['UnauthorizedError'];
  Mutation: {};
  String: Scalars['String'];
  SignInInput: SignInInput;
  SignInResult: ResolversParentTypes['SignInPayload'] | ResolversParentTypes['ValidationError'];
  VerifyTokenResult: ResolversParentTypes['VerifyTokenPayload'] | ResolversParentTypes['InvalidTokenError'] | ResolversParentTypes['TokenExpiredError'];
  User: User;
  ID: Scalars['ID'];
  UnauthorizedError: UnauthorizedError;
  Error: ResolversParentTypes['UnauthorizedError'] | ResolversParentTypes['ValidationError'] | ResolversParentTypes['InvalidTokenError'] | ResolversParentTypes['TokenExpiredError'] | ResolversParentTypes['TokenAlreadyUsed'];
  SignInPayload: SignInPayload;
  ValidationError: ValidationError;
  VerifyTokenPayload: VerifyTokenPayload;
  InvalidTokenError: InvalidTokenError;
  TokenExpiredError: TokenExpiredError;
  TokenAlreadyUsed: TokenAlreadyUsed;
  Boolean: Scalars['Boolean'];
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<ResolversTypes['MeResult'], ParentType, ContextType>;
};

export type MeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeResult'] = ResolversParentTypes['MeResult']> = {
  __resolveType: TypeResolveFn<'User' | 'UnauthorizedError', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  SignIn?: Resolver<ResolversTypes['SignInResult'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'credentials'>>;
  VerifyToken?: Resolver<ResolversTypes['VerifyTokenResult'], ParentType, ContextType, RequireFields<MutationVerifyTokenArgs, 'token'>>;
};

export type SignInResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignInResult'] = ResolversParentTypes['SignInResult']> = {
  __resolveType: TypeResolveFn<'SignInPayload' | 'ValidationError', ParentType, ContextType>;
};

export type VerifyTokenResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyTokenResult'] = ResolversParentTypes['VerifyTokenResult']> = {
  __resolveType: TypeResolveFn<'VerifyTokenPayload' | 'InvalidTokenError' | 'TokenExpiredError', ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UnauthorizedErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnauthorizedError'] = ResolversParentTypes['UnauthorizedError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  __resolveType: TypeResolveFn<'UnauthorizedError' | 'ValidationError' | 'InvalidTokenError' | 'TokenExpiredError' | 'TokenAlreadyUsed', ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SignInPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignInPayload'] = ResolversParentTypes['SignInPayload']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ValidationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidationError'] = ResolversParentTypes['ValidationError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VerifyTokenPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyTokenPayload'] = ResolversParentTypes['VerifyTokenPayload']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type InvalidTokenErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvalidTokenError'] = ResolversParentTypes['InvalidTokenError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type TokenExpiredErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenExpiredError'] = ResolversParentTypes['TokenExpiredError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type TokenAlreadyUsedResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenAlreadyUsed'] = ResolversParentTypes['TokenAlreadyUsed']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  MeResult?: MeResultResolvers;
  Mutation?: MutationResolvers<ContextType>;
  SignInResult?: SignInResultResolvers;
  VerifyTokenResult?: VerifyTokenResultResolvers;
  User?: UserResolvers<ContextType>;
  UnauthorizedError?: UnauthorizedErrorResolvers<ContextType>;
  Error?: ErrorResolvers;
  SignInPayload?: SignInPayloadResolvers<ContextType>;
  ValidationError?: ValidationErrorResolvers<ContextType>;
  VerifyTokenPayload?: VerifyTokenPayloadResolvers<ContextType>;
  InvalidTokenError?: InvalidTokenErrorResolvers<ContextType>;
  TokenExpiredError?: TokenExpiredErrorResolvers<ContextType>;
  TokenAlreadyUsed?: TokenAlreadyUsedResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
