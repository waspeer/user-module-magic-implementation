import type { Feature } from '../../lib/application/feature';

interface Arguments {
  email: string;
}

export class SignInFeature implements Feature<Arguments, void> {
  // eslint-disable-next-line class-methods-use-this
  public async execute({ email }: Arguments) {
    console.log(email);

    // 1. try to retrieve user associated with given email

    // not found

    // create and store a new user entity

    // 2. create a token

    // 3. dispatch events
  }
}
