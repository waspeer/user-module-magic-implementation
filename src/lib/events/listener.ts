import type { Event } from './event';

export interface Listener<T extends Event = any> {
  handle: (event: T) => Promise<void>;
  register: () => void;
}
