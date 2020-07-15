import type { UserLoginTokenCreatedEvent } from '../../domain/events/user-login-token-created';
import { Listener } from '../../lib/events/listener';

export class AfterUserLoginTokenCreated extends Listener<UserLoginTokenCreatedEvent> {
  public readonly eventType = 'user.loginTokenCreated';

  // eslint-disable-next-line class-methods-use-this
  public handle(event: UserLoginTokenCreatedEvent) {
    // TODO send login email

    console.log(event);
  }
}
