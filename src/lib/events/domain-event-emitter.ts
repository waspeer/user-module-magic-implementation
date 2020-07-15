import { EventEmitter } from 'events';
import type { Logger } from '../logger';
import type { Event } from './event';
import type { Listener } from './listener';

interface Dependencies {
  logger: Logger;
}

export class DomainEventEmitter {
  private readonly emitter: EventEmitter;
  private readonly logger: Logger;

  constructor({ logger }: Dependencies) {
    this.emitter = new EventEmitter();
    this.logger = logger;
  }

  public emit(eventOrEvents: Event | Event[]) {
    const events = Array.isArray(eventOrEvents) ? eventOrEvents : [eventOrEvents];

    events.forEach((event) => {
      this.logger.info('DomainEvent: %s', event.type);
      this.emitter.emit(event.type, event);
    });
  }

  public on<T extends Event>(eventType: string, listener: Listener<T>) {
    this.logger.debug(
      'DomainEventEmitter: registering %s for event %s',
      listener.constructor.name,
      eventType,
    );

    this.emitter.on(eventType, (e) => listener.handle(e));
  }
}
