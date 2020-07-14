import type { Resolver } from '../../../types/graphql/resolver';

type ResolverWithErrorHandler<A, R> = Resolver<A, R> & { handleError(error: Error): R };

export function CatchResolverError() {
  return <T extends ResolverWithErrorHandler<any, any>>(target: T, propertyKey: 'resolve') => {
    try {
      return target[propertyKey];
    } catch (error) {
      return target.handleError(error);
    }
  };
}
