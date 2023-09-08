import { HttpStatus } from '@nestjs/common/enums';

export interface IResponse {
  status: HttpStatus;
  msg: any;
  accessToken?: string;
}
