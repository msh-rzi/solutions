import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NPlusOneModule } from './modules/n-plus-one/n-plus-one.module';
import { ObservabilityModule } from './common/observability/observability.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ObservabilityModule,
    PrismaModule,
    NPlusOneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
