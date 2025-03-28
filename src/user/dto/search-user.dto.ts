import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class IdDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'User number ID',
  })
  id: number;
}

export class SearchUserDto extends IntersectionType(IdDto, CreateUserDto) {}
