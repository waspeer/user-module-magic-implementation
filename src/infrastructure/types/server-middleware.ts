import type { Express } from 'express';

export interface ServerMiddleware {
  apply(app: Express): void;
}
