import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ example: 'NestJS' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'nestjs' })
  @IsString()
  slug: string;
}
