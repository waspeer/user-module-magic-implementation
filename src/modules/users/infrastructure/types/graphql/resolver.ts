export interface Resolver<A, R> {
  resolve(args: A): Promise<R>;
}
