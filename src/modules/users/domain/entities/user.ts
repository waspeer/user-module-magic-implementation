import { UserCreatedEvent } from '../events/user-created-event';
import { UserLoginTokenCreatedEvent } from '../events/user-login-token-created';
import type { Email } from '../value-objects/email';
import { LoginToken } from '../value-objects/login-token';
import { AggregateRoot } from '~lib/domain/aggregate-root';

interface Props {
  email: Email;
}

export class User extends AggregateRoot<Props> {
  protected createCreatedEvent() {
    return new UserCreatedEvent(this);
  }

  get email() {
    return this.props.email;
  }

  public generateLoginToken() {
    const token = new LoginToken(this);

    this.events.add(
      new UserLoginTokenCreatedEvent({
        token,
        user: this,
      }),
    );

    return token;
  }
}
