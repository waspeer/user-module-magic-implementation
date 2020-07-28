import type { User as PrismaUser, Session as PrismaSession, UserCreateInput } from '@prisma/client';
import { User } from '../../domain/entities/user';
import { Email } from '../../domain/value-objects/email';
import type { User as GraphQLUser } from '../types/graphql/generated';
import { SessionMapper } from './session-mapper';
import { UUID } from '~lib/domain/uuid';

type PrismaUserWithSession = PrismaUser & { session: PrismaSession | null };

export class UserMapper {
  static toDomain(prismaUser: PrismaUserWithSession): User {
    return new User(
      {
        email: new Email(prismaUser.email),
        session: prismaUser.session ? SessionMapper.toDomain(prismaUser.session) : undefined,
      },
      new UUID(prismaUser.id),
    );
  }

  static toPersistence(user: User): UserCreateInput {
    return {
      id: user.id.value,
      email: user.email.value,
      session: {},
    };
  }

  static toPresentation(user: User): GraphQLUser {
    return {
      id: user.id.value,
      email: user.email.value,
    };
  }
}
