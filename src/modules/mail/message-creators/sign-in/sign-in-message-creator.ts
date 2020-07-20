import path from 'path';
import { MessageCreator } from '../base-message-creator';

interface Parameters {
  token: string;
}

export class SignInMessageCreator extends MessageCreator<Parameters> {
  protected readonly bodyTemplatePath = path.resolve(__dirname, 'sign-in-template.mjml');
}
