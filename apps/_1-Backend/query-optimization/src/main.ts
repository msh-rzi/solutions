import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: false,
    }),
  );

  const parsedPort = Number.parseInt(
    process.env.PORT_QUERY_OPTIMIZATION ?? process.env.PORT ?? '',
    10,
  );
  const port = Number.isNaN(parsedPort) ? 3000 : parsedPort;

  await app.listen(port);
  Logger.log(`Query optimization service listening on port ${port}`, 'Bootstrap');
}
void bootstrap();
