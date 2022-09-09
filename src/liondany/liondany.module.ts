import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
    providers: [EmailService],
    controllers: [EmailController],
    imports: [
        ConfigModule.forRoot(),
        MailerModule.forRoot({
            transport: process.env.SMTP_STRING_LIONDANY,
            defaults: {
                from: `'Liondany' <${process.env.SENDER_ADDRESS_LIONDANY}>`,
            },
            template: {
                dir: __dirname + 'assets/templates',
                adapter: new PugAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
})
export class LiondanyModule {}
