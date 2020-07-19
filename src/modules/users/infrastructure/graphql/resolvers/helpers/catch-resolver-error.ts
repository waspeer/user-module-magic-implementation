import type { Resolver } from '../../../types/graphql/resolver';

type ResolverWithErrorHandler<A, R> = Resolver<A, R> & { handleError(error: Error): R };

export function CatchResolverError<A = any, R = any>(
  target: ResolverWithErrorHandler<A, R>,
  _propertyKey: 'resolve',
  descriptor: PropertyDescriptor,
) {
  const resolver = descriptor.value;

  // eslint-disable-next-line no-param-reassign
  descriptor.value = async function resolveWithErrorHandling(...args: [A]) {
    try {
      return await resolver.call(this, ...args);
    } catch (error) {
      return target.handleError.call(this, error);
    }
  };
}
