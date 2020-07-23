import 'dotenv/config';
import 'module-alias/register';
import { AppDIContainer } from './infrastructure/app-di-container';
import type { Server } from './infrastructure/types/server';

const serviceProvider = new AppDIContainer();

serviceProvider.get<Server>('server').start();
