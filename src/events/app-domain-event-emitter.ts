import type { EventTypes } from './event-types';
import type { DomainEventEmitter } from '~lib/events/domain-event-emitter';

export type AppDomainEventEmitter = DomainEventEmitter<EventTypes>;
