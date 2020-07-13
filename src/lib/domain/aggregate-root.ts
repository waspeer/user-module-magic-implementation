import { EventQueue } from '../events/event-queue';
import { Entity } from './entity';

export abstract class AggregateRoot<T extends Record<string, any>> extends Entity<T> {
  public readonly events = new EventQueue();
}
