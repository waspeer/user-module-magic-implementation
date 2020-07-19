import { User } from '../entities/user';

export interface UserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  store(user: User): Promise<void>;
}
