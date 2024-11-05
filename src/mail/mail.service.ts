import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/models/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: User, OTP:string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Rent House appga xush kelibsiz',
      template: './confirm',
      context: {
        full_name: user.full_name,
        OTP,
      },
    });
  }
}
