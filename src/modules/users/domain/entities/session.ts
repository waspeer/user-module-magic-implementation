import { Entity } from '~lib/domain/entity';
import type { UUID } from '~lib/domain/uuid';

interface Props {
  createdAt: Date;
  userId: UUID;
}

type CreateArguments = Omit<Props, 'createdAt'> & Partial<Pick<Props, 'createdAt'>>;

export class Session extends Entity<Props> {
  /**
   * Lifetime of the session in seconds
   */
  static readonly Lifetime = 3600;

  public constructor(props: CreateArguments, id?: UUID) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  public isValid() {
    return this.expiresAt < new Date();
  }

  public get expiresAt() {
    return new Date(this.props.createdAt.getTime() + Session.Lifetime * 1000);
  }

  public get userId() {
    return this.props.userId;
  }
}
