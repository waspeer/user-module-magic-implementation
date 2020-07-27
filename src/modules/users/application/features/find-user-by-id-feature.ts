import type { User } from '../../domain/entities/user';
import type { UserRepository } from '../../domain/repositories/user-repository';
import type { Feature } from '~lib/application/feature';

interface Dependencies {
  userRepository: UserRepository;
}

interface Arguments {
  userId: string;
}

type Result = User | undefined;

export class FindUserByIdFeature implements Feature<Arguments, Result> {
  private readonly userRepository: UserRepository;

  public constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  public async execute({ userId }: Arguments): Promise<Result> {
    return this.userRepository.findById(userId);
  }
}
