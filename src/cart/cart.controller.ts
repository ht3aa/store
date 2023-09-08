import { Controller, Get, Post, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { IResponse } from '../interfaces/response.interface';
import { AuthGuard } from '../guards/Auth.guard';
import { IUserReq } from '../interfaces/users.interface'

@ApiTags('cart')
@Controller('cart')
export class CartController {

  constructor(private cartService: CartService) {}

  @ApiResponse({ status: 200, description: 'تم تعديل معلومات المستخدم بنجاح' })
  @Post('/:productId')
  @UseGuards(AuthGuard)
  async add(
    @Param('productId') productId: string,
    @Req() req: IUserReq,
  ): Promise<IResponse> {
    const userId: string = req.user.userId
    return await this.cartService.add(productId, userId);
  }

  @ApiResponse({ status: 200, description: 'معلومات المستخدم' })
  @Get('/one')
  @UseGuards(AuthGuard)
  async findOneByUserId(@Req() req: IUserReq): Promise<IResponse> {
    let id = req.user.userId
    return await this.cartService.findOneByUserId(id);
  }
  
  @ApiResponse({ status: 200, description: 'تم حذف المستخدم' })
  @Delete('/:id/:productId')
  async delete(@Param('id') id: string, @Param('productId') productId: string): Promise<IResponse> {
    return await this.cartService.delete(id, productId);
  }
}
