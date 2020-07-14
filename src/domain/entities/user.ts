import { AggregateRoot } from '../../lib/domain/aggregate-root';
import { UserCreatedEvent } from '../events/user-created-event';
import type { Email } from '../value-objects/email';

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
}
