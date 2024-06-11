import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  const config = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('This is the API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local environment')
    .addTag('Users')
//    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
