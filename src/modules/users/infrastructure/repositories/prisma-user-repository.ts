import type { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user';
import type { SessionRepository } from '../../domain/repositories/session-repository';
import type { UserRepository } from '../../domain/repositories/user-repository';
import { UserMapper } from '../mappers/user-mapper';

interface Dependencies {
  prismaClient: PrismaClient;
  sessionRepository: SessionRepository;
}

export class PrismaUserRepository implements UserRepository {
  private readonly prismaClient: PrismaClient;
  private readonly sessionRepository: SessionRepository;

  public constructor({ prismaClient, sessionRepository }: Dependencies) {
    this.prismaClient = prismaClient;
    this.sessionRepository = sessionRepository;
  }

  public async findByEmail(email: string) {
    const prismaUser = await this.prismaClient.user.findOne({
      where: { email },
      include: { session: true },
    });

    if (!prismaUser) {
      return undefined;
    }

    return UserMapper.toDomain(prismaUser);
  }

  public async findById(id: string) {
    const prismaUser = await this.prismaClient.user.findOne({
      where: { id },
      include: { session: true },
    });

    if (!prismaUser) {
      return undefined;
    }

    return UserMapper.toDomain(prismaUser);
  }

  public async store(user: User) {
    const data = UserMapper.toPersistence(user);

    await this.prismaClient.user.upsert({
      create: data,
      update: data,
      where: { id: user.id.value },
    });

    if (user.session) {
      await this.sessionRepository.store(user.session);
    }
  }
}
