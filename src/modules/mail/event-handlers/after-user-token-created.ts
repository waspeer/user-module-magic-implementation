import { MJMLSignInMessageCreator } from '../message-creators/sign-in/mjml-sign-in-message-creator';
import type { MailService } from '../types/mail-service';
import { Listener } from '~lib/events/listener';
import type { AppDomainEventEmitter } from '~root/events/app-domain-event-emitter';
import { EventTypes } from '~root/events/event-types';
import type { UserLoginTokenCreatedEvent } from '~root/events/event-types';

interface Dependencies {
  domainEventEmitter: AppDomainEventEmitter;
  mailService: MailService;
}

export class AfterUserLoginTokenCreated extends Listener<UserLoginTokenCreatedEvent> {
  public readonly eventType = EventTypes.UserLoginTokenCreated;
  public readonly mailService: MailService;

  public constructor({ domainEventEmitter, mailService }: Dependencies) {
    super({ domainEventEmitter });

    this.mailService = mailService;
  }

  public async handle(event: UserLoginTokenCreatedEvent) {
    this.sendSignInEmail(event);
  }

  private async sendSignInEmail(event: UserLoginTokenCreatedEvent) {
    const { token } = event.payload;
    const message = MJMLSignInMessageCreator.create({ token });

    this.mailService.send({
      message,
      to: 'hello@wannessalome.nl',
    });
  }
}
