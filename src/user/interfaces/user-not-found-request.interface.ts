import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UserNotFoundRequestResponseInterface {
  @ApiProperty({
    example: 'error',
    enum: ['error'],
    description: 'Status error of the request',
  })
  status: string;

  @ApiProperty({
    example: '2025-03-28T14:30:00.000Z',
    description: 'Timestamp do erro',
  })
  timestamp: string;

  @ApiProperty({
    example: 'Not found user ID 10',
    description: 'Error message',
  })
  error: HttpStatus;
}
