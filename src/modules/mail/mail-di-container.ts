import { asValue, createContainer, asClass } from 'awilix';
import type { AwilixContainer } from 'awilix';
import { AfterUserLoginTokenCreated } from './event-handlers/after-user-token-created';
import { NodemailerMailService, NodemailerMailServiceConfig } from './nodemailer-mail-service';
import { MailService } from './types/mail-service';
import { Listener } from '~lib/events/listener';
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
      // TODO type this
      transportOptions: asValue({
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

      mailService: asClass<MailService>(NodemailerMailService),

      /**
       * EVENTS
       */
      afterUserLoginTokenCreated: asClass(AfterUserLoginTokenCreated),
    });

    // REGISTER EVENT HANDLERS
    this.get<Listener<any>>('afterUserLoginTokenCreated').register();
  }

  public get<T>(name: string) {
    return this.container.resolve<T>(name);
  }
}
