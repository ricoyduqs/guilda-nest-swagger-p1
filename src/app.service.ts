import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { PingResponseOk } from './interfaces/ping-response-ok.interface';
import { PingResponseErrorInterface } from './interfaces/ping-response-error.interface';

@Injectable()
export class AppService {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  async checkHealth(): Promise<PingResponseOk> {
    try {
      const healthCheck = await this.health.check([
        (): Promise<any> =>
          this.http.pingCheck('swagger-ui', 'http://0.0.0.0:3000/api'),
      ]);

      return {
        status: 'success',
        timestamp: new Date().toISOString(),
        checks: {
          service: {
            status: healthCheck.status,
            details: 'Service is online and responding',
          },
          swagger: {
            status: healthCheck.info['swagger-ui'].status,
            details:
              healthCheck.info['swagger-ui'].status === 'up'
                ? 'Swagger documentation is accessible'
                : 'Error accessing Swagger documentation',
          },
        },
      };
    } catch (error) {
      const errorResponse: PingResponseErrorInterface = {
        status: 'error',
        timestamp: new Date().toISOString(),
        checks: {
          service: {
            status: 'down',
            details: 'Error checking service health',
          },
          error: error.message || 'Service Unavailable',
        },
      };

      throw new ServiceUnavailableException(errorResponse);
    }
  }
}
