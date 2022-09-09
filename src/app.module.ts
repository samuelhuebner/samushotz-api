import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InlovewithmomentsModule } from './inlovewithmoments/inlovewithmoments.module';
import { LiondanyModule } from './liondany/liondany.module';

@Module({
    imports: [ConfigModule.forRoot(), InlovewithmomentsModule, LiondanyModule],
    controllers: [AppController],
    providers: [AppService],
    exports: [],
})
export class AppModule {}
