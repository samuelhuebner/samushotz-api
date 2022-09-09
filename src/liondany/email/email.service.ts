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
                    from: `'Daniel Hübner' <${process.env.CONTACT_ADDRESS_LIONDANY}>`,
                    to: data.email,
                    subject: 'Thank you for your contact request!', // Subject line
                    template: __dirname + '/assets/templates/liondany.response.pug',
                    context: {
                        name: data.name,
                    },
                    attachments: [{ filename: 'logo.jpg', path: `${__dirname}/assets/img/logo.jpg`, cid: 'logo1' }],
                }),
            ].concat(
                this.mailerService.sendMail({
                    from: `'Daniel Hübner' <${process.env.CONTACT_ADDRESS_LIONDANY}>`,
                    to: process.env.CONTACT_ADDRESS_LIONDANY || process.env.CONTACT_ADDRESS,
                    subject: 'New contact request!',
                    template: __dirname + '/assets/templates/liondany.request.pug',
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
