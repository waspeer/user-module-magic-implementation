import 'dotenv/config';
import { ServiceProvider } from './infrastructure/service-provider';
import type { Server } from './infrastructure/types/server';
import type { Listener } from './lib/events/listener';

const serviceProvider = new ServiceProvider();

serviceProvider.get<Listener<any>>('afterUserLoginTokenCreated').register();

serviceProvider.get<Server>('server').start();
