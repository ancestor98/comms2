 import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

const jwtModule= JwtModule.registerAsync({

})
 @Module({

  //controllers: [AuthController],
   //providers: [AuthService],
})
 export class AuthModule {}
