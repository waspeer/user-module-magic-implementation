import type { Event } from '../events/event';
import { EventQueue } from '../events/event-queue';
import { Entity } from './entity';
import { UUID } from './uuid';

export abstract class AggregateRoot<T extends Record<string, any>> extends Entity<T> {
  protected createCreatedEvent?(): Event;
  public readonly events = new EventQueue();

  public constructor(props: T, id?: UUID) {
    super(props, id);

    if (!id && this.createCreatedEvent) {
      this.events.add(this.createCreatedEvent());
    }
  }
}
