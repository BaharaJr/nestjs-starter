import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConfiguration } from './database/config/baseconfiguration';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as helmet from 'helmet';

const config = getConfiguration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('NestJs API with Postgres and Typeorm')
    .setDescription('NestJs Starter')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());
  app.use(
    session({
      secret: 'secret-key',
      name: 'sess-tutorial',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(compression());
  await app.listen(config.port);
  console.log('App Listenig on Port', config.port)
}
bootstrap();
