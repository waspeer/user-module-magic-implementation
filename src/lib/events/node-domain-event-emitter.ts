import { EventEmitter } from 'events';

import type { Logger } from '../logger';
import type { DomainEventEmitter, Event, Listener } from './types';

interface Dependencies {
  logger: Logger;
}

export class NodeDomainEventEmitter<T extends string> implements DomainEventEmitter<T> {
  private readonly emitter: EventEmitter;
  private readonly logger: Logger;

  constructor({ logger }: Dependencies) {
    this.emitter = new EventEmitter();
    this.logger = logger;
  }

  public emit(eventOrEvents: Event<T> | Event<T>[]) {
    const events = Array.isArray(eventOrEvents) ? eventOrEvents : [eventOrEvents];

    events.forEach((event) => {
      this.logger.info('DomainEvent: %s', event.type);
      this.emitter.emit(event.type, event);
    });
  }

  public on<E extends Event>(eventType: T, listener: Listener<E>) {
    this.logger.debug(
      'DomainEventEmitter: registering %s for event %s',
      listener.constructor.name,
      eventType,
    );

    this.emitter.on(eventType, (error) => listener.handle(error));
  }
}
