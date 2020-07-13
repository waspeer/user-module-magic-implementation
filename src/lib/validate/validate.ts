import { StringValidator } from './validator-string';

import type { Options } from './types';

export class Validate {
  static string(subject: string, options?: Options) {
    return new StringValidator(subject, options);
  }
}
