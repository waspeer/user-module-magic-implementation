import { asClass, asValue, createContainer } from 'awilix';
import type { AwilixContainer } from 'awilix';
import { AfterUserLoginTokenCreated } from './event-handlers/after-user-token-created';
import { MJMLSignInMessageCreator } from './message-creators/sign-in/mjml-sign-in-message-creator';
import { NodemailerMailService } from './nodemailer-mail-service';
import type { NodemailerMailServiceConfig, TransportOptions } from './nodemailer-mail-service';
import type { MailService } from './types/mail-service';
import type { SignInMessageCreator } from './types/message-creator';
import type { DIContainer } from '~lib/infrastructure/di-container';
import type { Logger } from '~lib/logger';
import type { AppDomainEventEmitter } from '~root/events/app-domain-event-emitter';

interface Dependencies {
  domainEventEmitter: AppDomainEventEmitter;
  logger: Logger;
}

export class MailDIContainer implements DIContainer {
  private readonly container: AwilixContainer;

  public constructor({ domainEventEmitter, logger }: Dependencies) {
    this.container = createContainer();

    this.container.register({
      /**
       * CONFIG
       */
      mailServiceConfig: asValue<NodemailerMailServiceConfig>({
        fromAddress: 'hello@wannessalome.nl',
      }),
      transportOptions: asValue<TransportOptions>({
        host: 'smtp.soverin.net',
        port: 587,
        secure: false,
        auth: {
          user: 'hello@wannessalome.nl',
          pass: 'Ew0FevByjIY4',
        },
      }),

      /**
       * INFRASTRUCTURE
       */

      // GENERAL
      domainEventEmitter: asValue(domainEventEmitter),
      logger: asValue(logger),

      // MAILSERVICE
      mailService: asClass<MailService>(NodemailerMailService),

      // MESSAGE CREATORS
      signInMessageCreator: asValue<SignInMessageCreator>(MJMLSignInMessageCreator),
    });

    // REGISTER EVENT HANDLERS
    new AfterUserLoginTokenCreated(this.container.cradle).register();
  }

  public get<T>(name: string) {
    return this.container.resolve<T>(name);
  }
}
