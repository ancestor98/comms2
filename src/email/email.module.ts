import { Module } from '@nestjs/common';
import { EMailService} from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports:[ConfigModule,
    //TypeOrmModule.forFeature
    EventEmitterModule
  ],
  controllers: [EmailController],
  providers: [EMailService],
   exports: [EMailService],
})
export class EmailModule {}
