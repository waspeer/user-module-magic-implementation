import type { User } from '../entities/user';
import type { Event } from '~lib/events/event';

export class UserCreatedEvent implements Event<'user.created'> {
  public readonly aggregateId: string;
  public readonly createdAt = new Date();
  public readonly payload = undefined;
  public readonly type = 'user.created';

  public constructor(user: User) {
    this.aggregateId = user.id.value;
  }
}
