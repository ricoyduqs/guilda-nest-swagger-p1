import { ApiProperty } from '@nestjs/swagger';

export class ErrorCheck {
  @ApiProperty({
    example: 'down',
    enum: ['down'],
    description: 'Service status when in error',
  })
  status: string;

  @ApiProperty({
    example: 'Error checking service health',
    description: 'Detalhes do erro ocorrido',
  })
  details: string;
}

export class PingResponseErrorInterface {
  @ApiProperty({
    example: 'error',
    enum: ['error'],
    description: 'Verification error status',
  })
  status: string;

  @ApiProperty({
    example: '2025-03-28T14:30:00.000Z',
    description: 'Error timestamp',
  })
  timestamp: string;

  @ApiProperty({
    type: 'object',
    properties: {
      service: {
        type: ErrorCheck,
        example: {
          status: 'down',
          details: 'Error checking service health',
        },
      },
      error: {
        type: 'string',
        example: 'Service Unavailable',
        description: 'Error message',
      },
    },
  })
  checks: {
    service: ErrorCheck;
    error: string;
  };
}
