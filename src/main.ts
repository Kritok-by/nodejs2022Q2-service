import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';

import 'dotenv/config';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const rootDirname = dirname(__dirname);
  const doc = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(doc);
  SwaggerModule.setup('doc', app, document);
  // console.log(PORT);

  await app.listen(PORT);
}
bootstrap();
