import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const parsedPort = Number.parseInt(
    process.env.PORT_ACID_TRANSACTION_SYSTEM ?? process.env.PORT ?? '',
    10,
  );
  const port = Number.isNaN(parsedPort) ? 3000 : parsedPort;

  await app.listen(port);
}
void bootstrap();
