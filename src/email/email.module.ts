import { Module } from '@nestjs/common';
import { EMailService} from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[ConfigModule,
    //TypeOrmModule.forFeature
  ],
  controllers: [EmailController],
  providers: [EMailService],
   exports: [EMailService],
})
export class EmailModule {}
