import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
