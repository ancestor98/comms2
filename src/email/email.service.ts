import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/email.dto';

@Injectable()
export class EMailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: +this.configService.get<number>('EMAIL_PORT'),
      secure: false, // for 587 or 2525 — must be false!
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false, // allows self-signed certs in dev
      },
      logger: false, // shows info logs in terminal
      debug: false,  // shows SMTP-level logs
    });
  }

  async sendMail(dto: SendEmailDto): Promise<boolean> {
    const { recipient, subject, text, html } = dto;

    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: recipient,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(options);
      console.log('✅ Email sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('❌ Error sending email:', error?.message || error);
      return false;
    }
  }
}
