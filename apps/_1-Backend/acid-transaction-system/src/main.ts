import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const parsedPort = Number.parseInt(
    process.env.PORT_ACID_TRANSACTION_SYSTEM ?? process.env.PORT ?? '',
    10,
  );
  const port = Number.isNaN(parsedPort) ? 3000 : parsedPort;
  const host = process.env.APP_HOST ?? '0.0.0.0';

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ACID Transaction System API')
    .setDescription(
      'Double-entry ledger transaction API with locking and audit logging.',
    )
    .setVersion('1.0.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(port, host);
  Logger.log(
    `ACID transaction service listening on http://${host}:${port}`,
    'Bootstrap',
  );
  Logger.log(
    `Swagger docs available at http://${host}:${port}/docs`,
    'Bootstrap',
  );
}
void bootstrap();
