import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EmailModule } from 'src/email/email.module';
import { CentralLoggerService } from 'src/utility/logger/central-logger';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),
  EmailModule
],
  controllers: [UserController],
  providers: [UserService,CentralLoggerService],
  exports:[UserService]
})
export class UserModule {}
