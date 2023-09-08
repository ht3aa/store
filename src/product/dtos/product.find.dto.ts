import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindProductDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  withPhotoRelation: boolean;
}
