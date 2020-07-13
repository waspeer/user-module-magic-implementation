import type { UUID } from '../domain/uuid';

export interface Event<T extends string = string, S = any> {
  aggregateId: UUID;
  createdAt: Date;
  payload: S;
  type: T;
}
