import { Validate } from '~lib/validate';

export class Email {
  private readonly _value: string;

  public constructor(value: string) {
    Validate.string(value).email();

    this._value = value;
  }

  get value() {
    return this._value;
  }
}
