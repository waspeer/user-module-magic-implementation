import type { PrismaClient } from '@prisma/client';
import type { Session } from '../../domain/entities/session';
import type { SessionRepository } from '../../domain/repositories/session-repository';
import { SessionMapper } from '../mappers/session-mapper';

interface Dependencies {
  prismaClient: PrismaClient;
}

export class PrismaSessionRepository implements SessionRepository {
  private readonly prismaClient: PrismaClient;

  public constructor({ prismaClient }: Dependencies) {
    this.prismaClient = prismaClient;
  }

  public async store(session: Session) {
    const data = SessionMapper.toPersistence(session);

    await this.prismaClient.session.upsert({
      create: data,
      update: data,
      where: { id: session.id.value },
    });
  }
}
