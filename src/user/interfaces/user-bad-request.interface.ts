import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UserBadRequestResponseInterface {
  @ApiProperty({
    example: ['age must be a number conforming to the specified constraints'],
    type: 'array',
    description: 'Erros types received from class-validator',
  })
  message: object;

  @ApiProperty({
    example: 'Bad Request',
    description: 'Message error',
  })
  error: string;

  @ApiProperty({
    example: 400,
    description: 'Status Code',
  })
  statusCode: HttpStatus;
}
