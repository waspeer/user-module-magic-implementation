import type { User } from '../../domain/entities/user';
import { InvalidTokenError } from '../../domain/errors/invalid-token-error';
import type { UserRepository } from '../../domain/repositories/user-repository';
import { LoginToken } from '../../domain/value-objects/login-token';
import type { Feature } from '~lib/application/feature';
import type { Logger } from '~lib/logger';
import type { AppDomainEventEmitter } from '~root/events/app-domain-event-emitter';

interface Dependencies {
  domainEventEmitter: AppDomainEventEmitter;
  logger: Logger;
  userRepository: UserRepository;
}

interface Arguments {
  token: string;
}

export class CreateSessionFeature implements Feature<Arguments, User> {
  private readonly domainEventEmitter: AppDomainEventEmitter;
  private readonly logger: Logger;
  private readonly userRepository: UserRepository;

  public constructor({ domainEventEmitter, logger, userRepository }: Dependencies) {
    this.domainEventEmitter = domainEventEmitter;
    this.logger = logger;
    this.userRepository = userRepository;
  }

  public async execute({ token }: Arguments): Promise<User> {
    const { userId } = LoginToken.verify(token);
    const user = await this.userRepository.findById(userId);

    if (!user) {
      this.logger.debug('CreateSessionFeature: id in token could not be associated with a user');

      throw new InvalidTokenError();
    }

    this.logger.debug('CreateSessionFeature: token is valid, creating session...');

    // TODO check if correlationID was already used, if so token was already used
    // TODO check if a session already exists, if yes destroy it

    user.createSession();

    await this.userRepository.store(user);
    this.domainEventEmitter.emit(user.events.all);

    return user;
  }
}
