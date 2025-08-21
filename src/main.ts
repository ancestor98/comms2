import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,{ bufferLogs: true });
   
 
  const logger=app.get(Logger);
   app.useLogger(logger)
 
  app.setGlobalPrefix("api")

app.useGlobalPipes( 
  new ValidationPipe({
   whitelist: true}))
 
const PORT=process.env.PORT ?? 3000
try{
  await app.listen(PORT);
  logger.log(`my niggas im on and succsefully on you know boys on ${PORT} tune in`);


}catch(err){
  
  logger.log(`this app isnt comming up ${err.message} `);
}
}
bootstrap();
