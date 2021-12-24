import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
    controllers: [EmailController],
    providers: [EmailService],
    imports: [
        ConfigModule.forRoot(),
        MailerModule.forRoot({
            transport: process.env.SMTP_STRING,
            defaults: {
                from: `'inlovewithmoments' <${process.env.SENDER_ADDRESS}>`,
            },
            template: {
                dir: __dirname + '/assets/templates',
                adapter: new PugAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
})
export class EmailModule {}
