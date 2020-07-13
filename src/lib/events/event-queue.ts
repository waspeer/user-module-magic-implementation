import type { Event } from './event';

export class EventQueue {
  private events: Event[] = [];

  public add(event: Event) {
    this.events.push(event);
  }

  get all() {
    return this.events;
  }
}
