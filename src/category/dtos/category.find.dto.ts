import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindCategoryDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  withProductsRelation: boolean;
}
