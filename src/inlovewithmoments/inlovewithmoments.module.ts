import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(), EmailModule],
})
export class InlovewithmomentsModule {}
