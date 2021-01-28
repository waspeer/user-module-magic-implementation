import { Identifier } from './identifier';

export abstract class Entity<T extends Record<string, any>> {
  public readonly id: Identifier;
  protected props: T;

  public constructor(properties: T, id?: Identifier) {
    this.id = id || new Identifier();
    this.props = properties;
  }

  public equals(entity: Entity<T>) {
    if (entity.constructor !== this.constructor) {
      return false;
    }

    return this.id.equals(entity.id);
  }
}
