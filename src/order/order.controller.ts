import {
  Get,
  Post,
  Param,
  Req,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { IResponse } from '../interfaces/response.interface';
import { AuthGuard } from '../guards/Auth.guard';
import { IUserReq } from '../interfaces/users.interface';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) { }

  @ApiResponse({ status: 200, description: 'طلبية' })
  @Get('/')
  @UseGuards(AuthGuard)
  async findOneByUserId(@Req() req: IUserReq): Promise<IResponse> {
    let id = req.user.userId
    return await this.orderService.findOneByUserId(id);
  }

  @ApiResponse({ status: 200, description: 'تمت أضافة الطلبية' })
  @Post('/:productId')
  @UseGuards(AuthGuard)
  async add(
    @Param('productId') productId: string,
    @Req() req: IUserReq,
  ): Promise<IResponse> {
    const userId: string = req.user.userId
    return await this.orderService.add(productId, userId);
  }


}
