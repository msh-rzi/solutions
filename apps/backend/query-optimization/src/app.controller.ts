import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('overview')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get project overview and usage guidance' })
  @Get()
  getProjectOverview() {
    return this.appService.getProjectOverview();
  }
}
