import { User } from '../../domain/entities/user';
import type { UserRepository } from '../../domain/repositories/user-repository';
import { Email } from '../../domain/value-objects/email';
import type { Feature } from '~lib/application/feature';
import type { Logger } from '~lib/logger';
import { AppDomainEventEmitter } from '~root/events/app-domain-event-emitter';

interface Dependencies {
  domainEventEmitter: AppDomainEventEmitter;
  logger: Logger;
  userRepository: UserRepository;
}

interface Arguments {
  email: string;
}

export class SignInFeature implements Feature<Arguments, User> {
  private readonly domainEventEmitter: AppDomainEventEmitter;
  private readonly logger: Logger;
  private readonly userRepository: UserRepository;

  public constructor({ domainEventEmitter, logger, userRepository }: Dependencies) {
    this.domainEventEmitter = domainEventEmitter;
    this.logger = logger;
    this.userRepository = userRepository;
  }

  public async execute({ email }: Arguments) {
    let user: User;

    const userOrUndefined = await this.userRepository.findByEmail(email);

    if (userOrUndefined === undefined) {
      this.logger.debug(
        "SignInFeature: no user with email '%s' found, attempting to create it...",
        email,
      );

      user = new User({
        email: new Email(email),
      });

      await this.userRepository.store(user);
    } else {
      this.logger.debug('SignInFeature: found user associated with email: %s', email);

      user = userOrUndefined;
    }

    user.generateLoginToken();

    this.domainEventEmitter.emit(user.events.all);

    return user;
  }
}
