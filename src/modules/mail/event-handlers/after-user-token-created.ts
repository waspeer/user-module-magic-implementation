import type { MailService } from '../types/mail-service';
import type { SignInMessageCreator } from '../types/message-creator';
import { Listener } from '~lib/events/listener';
import type { AppDomainEventEmitter } from '~root/events/app-domain-event-emitter';
import { EventTypes } from '~root/events/event-types';
import type { UserLoginTokenCreatedEvent } from '~root/events/event-types';

interface Dependencies {
  domainEventEmitter: AppDomainEventEmitter;
  mailService: MailService;
  signInMessageCreator: SignInMessageCreator;
}

export class AfterUserLoginTokenCreated extends Listener<UserLoginTokenCreatedEvent> {
  public readonly eventType = EventTypes.UserLoginTokenCreated;

  private readonly mailService: MailService;
  private readonly signInMessageCreator: SignInMessageCreator;

  public constructor({ domainEventEmitter, mailService, signInMessageCreator }: Dependencies) {
    super({ domainEventEmitter });

    this.mailService = mailService;
    this.signInMessageCreator = signInMessageCreator;
  }

  public async handle(event: UserLoginTokenCreatedEvent) {
    this.sendSignInEmail(event);
  }

  private async sendSignInEmail(event: UserLoginTokenCreatedEvent) {
    const { token, user } = event.payload;

    this.mailService.send({
      to: user.email,
      message: this.signInMessageCreator.create({ token }),
    });
  }
}
