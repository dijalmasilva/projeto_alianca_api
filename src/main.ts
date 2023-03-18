import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '/app.module';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    appOptions,
  );

  const config = new DocumentBuilder()
    .setTitle('Projeto Aliança')
    .setDescription('API para gerenciamento da igreja de Jesus')
    .setVersion('0.1.0')
    .addBearerAuth()
    .addServer('/api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  app.setGlobalPrefix('api');
  await app.listen(3000, '0.0.0.0');
}

bootstrap().catch((err) => {
  console.error(err);
});
