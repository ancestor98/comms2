import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT=process.env.PORT ?? 3000
  app.setGlobalPrefix("api/")

app.useGlobalPipes( new ValidationPipe({ whitelist: true}))

  await app.listen(PORT);

  
  console.log(`my niggas im on and succsefully on you know boys on ${PORT} tune in`);
}
bootstrap();
