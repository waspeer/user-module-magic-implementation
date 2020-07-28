import type { User } from '../entities/user';
import type { LoginToken } from '../value-objects/login-token';
import {
  EventTypes,
  UserLoginTokenCreatedEvent as IUserLoginTokenCreatedEvent,
} from '~root/events/event-types';

export class UserLoginTokenCreatedEvent implements IUserLoginTokenCreatedEvent {
  public readonly aggregateId: string;
  public readonly createdAt = new Date();
  public readonly payload: { token: string; user: { email: string } };
  public readonly type = EventTypes.UserLoginTokenCreated;

  public constructor({ user, token }: { user: User; token: LoginToken }) {
    this.aggregateId = user.id.value;
    this.payload = {
      token: token.value,
      user: {
        email: user.email.value,
      },
    };
  }
}