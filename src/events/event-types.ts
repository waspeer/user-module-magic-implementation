import { Event } from '~lib/events/event';

export enum EventTypes {
  UserCreated = 'user.created',
  UserLoginTokenCreated = 'user.login_token_created',
}

export type UserCreatedEvent = Event<EventTypes.UserCreated>;

export type UserLoginTokenCreatedEvent = Event<EventTypes.UserLoginTokenCreated, { token: string }>;
