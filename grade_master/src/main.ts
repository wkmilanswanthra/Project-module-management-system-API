import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Grade Master')
    .setDescription('Grade Master APIs')
    .setVersion('1.0')
    .addTag('Grade Master')
    .build();
  app.setGlobalPrefix('api/v1');
  // Create document and serve with Swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
