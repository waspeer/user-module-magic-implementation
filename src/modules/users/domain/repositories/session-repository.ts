import type { Session } from '../entities/session';

export interface SessionRepository {
  store(session: Session): Promise<void>;
}
