import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailRequestBody } from './models';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(data: EmailRequestBody) {
        await Promise.all(
            [
                this.mailerService.sendMail({
                    to: data.email,
                    subject: 'Vielen Dank für deine Nachricht!', // Subject line
                    template: './inlovewithmoments.response.pug',
                    context: {
                        name: data.name,
                    },
                    attachments: [{ filename: 'logo.png', path: `${__dirname}/assets/img/logo.png`, cid: 'logo1' }],
                }),
            ].concat(
                this.mailerService.sendMail({
                    to: process.env.CONTACT_ADDRESS,
                    subject: 'Neue Kontaktanfrage!',
                    template: './inlovewithmoments.request.pug',
                    context: {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        category: data.selectedCategory,
                        date: data.selectedDate,
                        message: data.message,
                    },
                }),
            ),
        );
    }
}
