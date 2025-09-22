import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/data-source';
import { UserModule } from './user/user.module';
import { CurrentUserMiddleware } from './utility/middleware/current-middleware';
import { EmailModule } from './email/email.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import {  LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import sentryConfig from './config/sentry.config';
import { SentryTrackerService } from './utility/sentry-traker.service ';
//import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitterDefaultConfigOptions } from './utility/event.util';


@Module({
  imports: [
    ConfigModule.forRoot({
       isGlobal: true,
       load: [sentryConfig]

    }),
     TypeOrmModule.forRoot(dataSourceOption)
    ,UserModule,
     EmailModule,
      CategoriesModule,
       ProductModule,
        ReviewModule,
        
        EventEmitterModule.forRoot( EventEmitterDefaultConfigOptions),
    LoggerModule.forRoot({
      pinoHttp:{
        autoLogging:false,
        level:"debug",
        transport:{
          target:"pino-pretty",
          options:{
            colorize:true,
            translateTime:'SYS:standard'
          }
        }
      }

    }),
    //AuthModule,
    UploadModule
  ],
  controllers: [],
  providers: [
    SentryTrackerService
  ],
})
export class AppModule {

   configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
