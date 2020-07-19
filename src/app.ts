import 'dotenv/config';
import 'module-alias/register';
import { AppDIContainer } from './infrastructure/app-di-container';
import type { Server } from './infrastructure/types/server';

// TODO make server start more generic?

const serviceProvider = new AppDIContainer();

serviceProvider.get<Server>('server').start();
