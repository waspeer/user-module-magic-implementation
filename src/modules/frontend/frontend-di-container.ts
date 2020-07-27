import { AwilixContainer, asValue, createContainer, asClass } from 'awilix';

import { Routes } from './routes';
import type { DIContainer } from '~lib/infrastructure/di-container';
import type { Logger } from '~lib/logger';

interface Dependencies {
  logger: Logger;
}

export class FrontendDIContainer implements DIContainer {
  private readonly container: AwilixContainer;

  public constructor({ logger }: Dependencies) {
    this.container = createContainer();

    this.container.register({
      /**
       * INFRASTRUCTURE
       */
      // GENERAL
      logger: asValue(logger),
      router: asClass(Routes),
    });
  }

  public get<T>(name: string) {
    return this.container.resolve<T>(name);
  }
}
