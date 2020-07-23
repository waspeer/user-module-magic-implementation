import fs from 'fs';
import path from 'path';
import { MJMLMessageCreator } from '../mjml-message-creator';

interface Parameters {
  token: string;
}

const TEMPLATE_PATH = path.resolve(__dirname, 'sign-in-template.mjml');

export class SignInMessageCreator extends MJMLMessageCreator<Parameters> {
  public constructor() {
    super({
      mjmlBodyTemplate: fs.readFileSync(TEMPLATE_PATH, 'utf-8'),
      subjectTemplate: 'Login to UserModule',
    });
  }
}
