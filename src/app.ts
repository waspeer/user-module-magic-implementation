import 'dotenv/config';
import { ServiceProvider } from './infrastructure/service-provider';
import type { Server } from './infrastructure/types/server';

const serviceProvider = new ServiceProvider();

serviceProvider.get<Server>('server').start();
