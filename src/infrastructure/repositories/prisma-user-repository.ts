import type { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user';
import type { UserRepository } from '../../domain/repositories/user-repository';
import { UserMapper } from '../mappers/user-mapper';

interface Dependencies {
  prismaClient: PrismaClient;
}

export class PrismaUserRepository implements UserRepository {
  private readonly prismaClient: PrismaClient;

  public constructor({ prismaClient }: Dependencies) {
    this.prismaClient = prismaClient;
  }

  public async findByEmail(email: string) {
    const prismaUser = await this.prismaClient.user.findOne({
      where: { email },
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
  }
}
