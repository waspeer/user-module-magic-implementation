import type { Message } from './message';

export interface MessageCreator<T extends Record<string, any>> {
  create(parameters: T): Message;
}

/**
 * SIGN IN MESSAGE
 */
interface SignInParameters {
  token: string;
}

export type SignInMessageCreator = MessageCreator<SignInParameters>;
