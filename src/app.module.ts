import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/data-source';
import { UserModule } from './user/user.module';
import { CurrentUserMiddleware } from './utility/middleware/current-middleware';
import { EmailModule } from './email/email.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOption),UserModule, EmailModule, CategoriesModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {

   configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
