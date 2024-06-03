import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  await app.listen(3000);
}
bootstrap();
