import { UserCreatedEvent } from '../events/user-created-event';
import { UserLoginTokenCreatedEvent } from '../events/user-login-token-created-event';
import { UserSessionCreatedEvent } from '../events/user-session-created-event';
import type { Email } from '../value-objects/email';
import { LoginToken } from '../value-objects/login-token';
import { Session } from './session';
import { AggregateRoot } from '~lib/domain/aggregate-root';
import type { EventTypes } from '~root/events/event-types';

interface Props {
  email: Email;
  session?: Session;
}

export class User extends AggregateRoot<Props, EventTypes> {
  protected createCreatedEvent() {
    return new UserCreatedEvent(this);
  }

  get email() {
    return this.props.email;
  }

  get session() {
    return this.props.session;
  }

  public createLoginToken() {
    const token = new LoginToken(this);

    this.events.add(
      new UserLoginTokenCreatedEvent({
        token,
        user: this,
      }),
    );

    return token;
  }

  public createSession() {
    this.props.session = new Session({ userId: this.id });

    this.events.add(new UserSessionCreatedEvent({ user: this }));

    return this.props.session;
  }
}
