import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as requestIp from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // get user ip
  app.set('trust proxy', 1);
  app.use(requestIp.mw());

  await app.listen(3000);
}
bootstrap();
