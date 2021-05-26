import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import 'reflect-metadata';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('My Jame List API')
    .setDescription('The API to My Jame List')
    .setVersion('1.0')
    .addTag('jame')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT, () => {
    console.log('Server start at: ' + process.env.PORT);
  });
}
bootstrap();
