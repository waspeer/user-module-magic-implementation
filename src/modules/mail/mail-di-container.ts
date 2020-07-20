import { asValue, createContainer } from 'awilix';
import type { AwilixContainer } from 'awilix';
import { AfterUserLoginTokenCreated } from './event-handlers/after-user-token-created';
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
       * INFRASTRUCTURE
       */

      // GENERAL
      domainEventEmitter: asValue(domainEventEmitter),
      logger: asValue(logger),
    });

    // REGISTER EVENT HANDLERS
    new AfterUserLoginTokenCreated({ domainEventEmitter }).register();
  }

  public get<T>(name: string) {
    return this.container.resolve<T>(name);
  }
}
