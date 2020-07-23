import { SignInMessageCreator } from './modules/mail/message-creators/sign-in/sign-in-message-creator';

const bla = new SignInMessageCreator();

(() => bla)();

console.log(bla.create({ token: 'TOKEN' }));
