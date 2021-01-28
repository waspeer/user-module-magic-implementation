import { Identifier } from '../domain/identifier';

interface Event<T extends string = string, S = any> {
  id: Identifier;
  aggregateId: Identifier;
  occurredAt: Date;
  payload: S;
  type: T;
  serializePayload(): string;
}

interface Listener<E extends Event> {
  handle(event: E): Promise<void> | void;
}

interface DomainEventEmitter<T extends string> {
  emit(eventOrEvents: Event<T> | Event<T>[]): void;
  on<E extends Event>(eventType: T, listener: Listener<E>): void;
}

export { Event, Listener, DomainEventEmitter };
