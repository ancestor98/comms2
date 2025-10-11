 import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { getSecurityConfigName } from 'src/config/security.config';
import { SecurityConfig } from 'src/types/types';

const jwtModule= JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory:async(configservice:ConfigService)=> ({
        secret:configservice.get<SecurityConfig>(getSecurityConfigName()).jwtSecret,
        signOptions:{expiresIn:"100s"}
    }),
    inject:[ConfigService]

});
 @Module({
    imports:[jwtModule]

  //controllers: [AuthController],
   //providers: [AuthService],
})
 export class AuthModule {}
