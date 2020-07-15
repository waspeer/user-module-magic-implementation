import type { Event } from '../../lib/events/event';
import type { User } from '../entities/user';
import type { LoginToken } from '../value-objects/login-token';

export class UserLoginTokenCreatedEvent
  implements Event<'user.loginTokenCreated', { token: string }> {
  public readonly aggregateId: string;
  public readonly createdAt = new Date();
  public readonly payload: { token: string };
  public readonly type = 'user.loginTokenCreated';

  public constructor({ user, token }: { user: User; token: LoginToken }) {
    this.aggregateId = user.id.value;
    this.payload = { token: token.value };
  }
}
