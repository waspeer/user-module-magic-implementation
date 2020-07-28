import type { User } from '../entities/user';
import {
  EventTypes,
  UserSessionCreatedEvent as IUserSessionCreatedEvent,
} from '~root/events/event-types';

export class UserSessionCreatedEvent implements IUserSessionCreatedEvent {
  public readonly aggregateId: string;
  public readonly createdAt = new Date();
  public readonly payload: { sessionId: string };
  public readonly type = EventTypes.UserSessionCreated;

  public constructor({ user }: { user: User }) {
    if (!user.session) {
      throw new Error('UserSessionCreatedEvent: unable to create event, user session is not set');
    }

    this.aggregateId = user.id.value;
    this.payload = { sessionId: user.session.id.value };
  }
}
