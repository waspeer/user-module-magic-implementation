import type { Message } from './message';

export interface MessageCreator<T extends Record<string, any>> {
  create(parameters: T): Message;
}
