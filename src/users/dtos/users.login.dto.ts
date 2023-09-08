import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUsersDto {
  @ApiProperty()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsOptional()
  password: string;
}
