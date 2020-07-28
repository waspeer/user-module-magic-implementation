import { Event } from '~lib/events/event';

export enum EventTypes {
  UserCreated = 'user.created',
  UserLoginTokenCreated = 'user.login_token_created',
  UserSessionCreated = 'user.session_created',
}

export type UserCreatedEvent = Event<EventTypes.UserCreated>;

export type UserLoginTokenCreatedEvent = Event<
  EventTypes.UserLoginTokenCreated,
  { token: string; user: { email: string } }
>;

export type UserSessionCreatedEvent = Event<EventTypes.UserSessionCreated, { sessionId: string }>;
