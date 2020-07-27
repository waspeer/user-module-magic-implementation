import type { User as PrismaUser, UserCreateInput } from '@prisma/client';
import { User } from '../../domain/entities/user';
import { Email } from '../../domain/value-objects/email';
import type { User as GraphQLUser } from '../types/graphql/generated';
import { UUID } from '~lib/domain/uuid';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User({ email: new Email(prismaUser.email) }, new UUID(prismaUser.id));
  }

  static toPersistence(user: User): UserCreateInput {
    return {
      id: user.id.value,
      email: user.email.value,
    };
  }

  static toPresentation(user: User): GraphQLUser {
    return {
      id: user.id.value,
      email: user.email.value,
    };
  }
}
