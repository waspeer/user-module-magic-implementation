import type { SessionCreateInput, Session as PrismaSession } from '@prisma/client';
import { Session } from '../../domain/entities/session';
import { UUID } from '~lib/domain/uuid';

export class SessionMapper {
  static toDomain(prismaSession: PrismaSession): Session {
    return new Session(
      {
        createdAt: prismaSession.createdAt,
        userId: new UUID(prismaSession.userId),
      },
      new UUID(prismaSession.id),
    );
  }

  static toPersistence(session: Session): SessionCreateInput {
    return {
      id: session.id.value,
      user: {
        connect: {
          id: session.userId.value,
        },
      },
    };
  }
}
