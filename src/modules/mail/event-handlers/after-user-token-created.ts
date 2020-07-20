import { Listener } from '~lib/events/listener';
import { UserLoginTokenCreatedEvent, EventTypes } from '~root/events/event-types';

export class AfterUserLoginTokenCreated extends Listener<UserLoginTokenCreatedEvent> {
  public readonly eventType = EventTypes.UserLoginTokenCreated;

  // eslint-disable-next-line class-methods-use-this
  public async handle(event: UserLoginTokenCreatedEvent) {
    console.log(event);
  }
}
