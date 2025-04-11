import { Controller, Get } from '@nestjs/common';
import {
  ApiExcludeController,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import { PingResponseOk } from './interfaces/ping-response-ok.interface';
import { PingResponseErrorInterface } from './interfaces/ping-response-error.interface';

@ApiTags('app')
@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('health')
  @ApiOperation({
    summary: 'Check service status',
    description: `Route used to check the status of the system and its dependencies.`,
  })
  @ApiOkResponse({
    description: 'The service is operating normally',
    type: PingResponseOk,
  })
  @ApiServiceUnavailableResponse({
    description: 'Service unavailable',
    type: PingResponseErrorInterface,
  })
  async healthCheck(): Promise<PingResponseOk | PingResponseErrorInterface> {
    return this.appService.checkHealth();
  }
}
