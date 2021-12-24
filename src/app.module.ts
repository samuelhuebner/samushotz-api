import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InlovewithmomentsModule } from './inlovewithmoments/inlovewithmoments.module';

@Module({
    imports: [ConfigModule.forRoot(), InlovewithmomentsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
