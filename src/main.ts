import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/helpers/error-handling';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/helpers/winston-logging';

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    console.log(PORT);
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig)
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new AllExceptionsFilter)

    const config = new DocumentBuilder()
      .setTitle('Rent House project')
      .setDescription('Rent House project RES API')
      .setVersion('1.0')
      .addTag('NestJS, Sequelize, swagger, OTP')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
