import type { User } from '../entities/user';

export interface UserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  store(user: User): Promise<void>;
}
