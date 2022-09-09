import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailRequestBody } from '../../models';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(data: EmailRequestBody) {
        await Promise.all(
            [
                this.mailerService.sendMail({
                    to: data.email,
                    subject: 'Thank you for your contact request!', // Subject line
                    template: './liondany.response.pug',
                    context: {
                        name: data.name,
                    },
                    attachments: [{ filename: 'logo.jpg', path: `${__dirname}/assets/img/logo.jpg`, cid: 'logo1' }],
                }),
            ].concat(
                this.mailerService.sendMail({
                    to: process.env.CONTACT_ADDRESS_LIONDANY || process.env.CONTACT_ADDRESS,
                    subject: 'New contact request!',
                    template: './liondany.request.pug',
                    context: {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        message: data.message,
                    },
                }),
            ),
        );
    }
}
