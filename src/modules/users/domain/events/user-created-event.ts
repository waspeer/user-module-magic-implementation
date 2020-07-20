import type { User } from '../entities/user';
import { EventTypes, UserCreatedEvent as IUserCreatedEvent } from '~root/events/event-types';

export class UserCreatedEvent implements IUserCreatedEvent {
  public readonly aggregateId: string;
  public readonly createdAt = new Date();
  public readonly payload = undefined;
  public readonly type = EventTypes.UserCreated;

  public constructor(user: User) {
    this.aggregateId = user.id.value;
  }
}
