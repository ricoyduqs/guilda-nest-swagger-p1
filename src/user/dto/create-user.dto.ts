import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Tarcisio',
    description: 'User full name',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'tarcisio@yduqs.com.br',
    description: 'User email',
  })
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 30,
    description: 'User age',
  })
  age: number;
}
