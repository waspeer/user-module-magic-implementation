import fs from 'fs';
import path from 'path';
import type { SignInMessageCreator } from '../../types/message-creator';
import { MJMLMessageCreator } from '../mjml-message-creator';

const TEMPLATE_PATH = path.resolve(__dirname, 'sign-in-template.mjml');

export const MJMLSignInMessageCreator: SignInMessageCreator = MJMLMessageCreator.create({
  mjmlBodyTemplate: fs.readFileSync(TEMPLATE_PATH, 'utf-8'),
  subjectTemplate: 'Login to UserModule',
});
