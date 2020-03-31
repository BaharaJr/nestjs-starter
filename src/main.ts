import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConfiguration } from './database/config/baseconfiguration';
import * as compression from 'compression';

const config = getConfiguration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());
  await app.listen(config.port);
}
bootstrap();
