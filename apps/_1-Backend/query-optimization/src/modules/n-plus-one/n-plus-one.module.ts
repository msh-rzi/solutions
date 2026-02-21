import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { NPlusOneController } from './n-plus-one.controller';
import { NPlusOneService } from './n-plus-one.service';

@Module({
  imports: [UsersModule],
  controllers: [NPlusOneController],
  providers: [NPlusOneService],
})
export class NPlusOneModule {}
