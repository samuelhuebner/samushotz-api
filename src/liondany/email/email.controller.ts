import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailRequestBody } from '../../models';

@Controller('liondany/email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post()
    async sendEmail(@Body() body: EmailRequestBody) {
        return this.emailService.sendEmail(body);
    }
}
