import { createTransport } from 'nodemailer';
import type JSONTransport from 'nodemailer/lib/json-transport';
import type Mail from 'nodemailer/lib/mailer';
import type SendmailTransport from 'nodemailer/lib/sendmail-transport';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import type { MailService } from './types/mail-service';
import type { Message } from './types/message';

export interface NodemailerMailServiceConfig {
  fromAddress: string;
}

interface Dependencies {
  mailServiceConfig: NodemailerMailServiceConfig;
  transportOptions: SendmailTransport.Options | JSONTransport.Options | SMTPTransport.Options | any;
}

export class NodemailerMailService implements MailService {
  private readonly config: NodemailerMailServiceConfig;
  private readonly transport: Mail;

  public constructor({ mailServiceConfig, transportOptions }: Dependencies) {
    this.config = mailServiceConfig;
    this.transport = createTransport(transportOptions);
  }

  // TODO clean this up
  public async send(options: { to: string; message: Message }) {
    const { to, message } = options;

    const bla = await this.transport.sendMail({
      html: message.html,
      subject: message.subject,
      from: this.config.fromAddress,
      to,
    });

    console.log(bla);
  }
}
