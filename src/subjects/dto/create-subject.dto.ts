import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
//   @IsString()
//   @IsNotEmpty()
//   @ApiProperty({
//     description: 'Name of the subject',
//     type: String,
//     required: true,
//     default: 'Math',
//   })
  name: string;

  description: string;
  semester: number;
  credits: number;
  departmentId: number;
}
