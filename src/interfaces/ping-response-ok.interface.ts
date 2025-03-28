import { ApiProperty } from '@nestjs/swagger';

export class ServiceCheck {
  @ApiProperty({
    example: 'up',
    enum: ['up', 'down'],
    description: 'Current service status',
  })
  status: string;

  @ApiProperty({
    example: 'Service is online and responding',
    description: 'Service status details',
  })
  details: string;
}

export class PingResponseOk {
  @ApiProperty({
    example: 'success',
    enum: ['success', 'error'],
    description: 'Overall verification status',
  })
  status: string;

  @ApiProperty({
    example: '2025-03-28T14:30:00.000Z',
    description: 'Verification Timestamp',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Details of checks carried out',
    type: () => ({
      service: { type: () => ServiceCheck },
      swagger: { type: () => ServiceCheck },
    }),
  })
  checks: {
    service: ServiceCheck;
    swagger: ServiceCheck;
  };
}
