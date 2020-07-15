import type { DomainEventEmitter } from './domain-event-emitter';
import type { Event } from './event';

interface Dependencies {
  domainEventEmitter: DomainEventEmitter;
}

export abstract class Listener<T extends Event> {
  abstract readonly eventType: T['type'];

  private readonly domainEventEmitter: DomainEventEmitter;

  public constructor({ domainEventEmitter }: Dependencies) {
    this.domainEventEmitter = domainEventEmitter;
  }

  abstract handle(event: T): Promise<void> | void;

  public register() {
    this.domainEventEmitter.on(this.eventType, this);
  }
}
