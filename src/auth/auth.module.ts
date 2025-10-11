 import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
 import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { getSecurityConfigName } from 'src/config/security.config';
import { SecurityConfig } from 'src/types/types';

 @Module({
    imports:[
  JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory:async(configService:ConfigService)=> ({
        //secret:configService.get<SecurityConfig>(getSecurityConfigName()).jwtSecret,
         secret: configService.get<string>('ACCESS_TOKEN_SECRET_KEY') || 'default_secret',
        signOptions:{expiresIn:"100s"}
    }),
    inject:[ConfigService]

})
],
// @Module({
    //imports:[jwtModule],

  //controllers: [AuthController],
   providers: [AuthService],
    exports: [AuthService, JwtModule],

})
 export class AuthModule {}
