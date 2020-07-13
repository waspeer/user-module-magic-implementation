import type { Logger } from '../logger';
import type { Event } from './event';
import type { Listener } from './listener';

interface Dependencies {
  logger: Logger;
}

export class DomainEventEmitter {
  private listeners: Record<string, Listener[]> = {};
  private readonly logger: Logger;

  constructor({ logger }: Dependencies) {
    this.logger = logger;
  }

  public emit(eventOrEvents: Event | Event[]) {
    const events = Array.isArray(eventOrEvents) ? eventOrEvents : [eventOrEvents];

    Promise.all(
      events.flatMap((event) => {
        this.logger.info('Event: %s', event.type);

        const listeners = this.listeners[event.type] ?? [];

        return listeners.map((listener) => listener.handle(event));
      }),
    );
  }

  public on<T extends Event>(eventType: string, listener: Listener<T>) {
    this.logger.debug(
      'DomainEventEmitter: registering %s for %s',
      listener.constructor.name,
      eventType,
    );

    if (!(eventType in this.listeners)) {
      this.listeners[eventType] = [];
    }

    this.listeners[eventType].push(listener);
  }
}
