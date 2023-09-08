import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { IResponse } from '../interfaces/response.interface';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
  ) { }

  async findOneByUserId(id: string): Promise<IResponse> {
    const orders = await this.orderRepository.find({
      where: {
        user: {
          id
        }
      },
      relations: ['product', 'product.photos'],
    });
    if (orders) {
      return {
        status: HttpStatus.OK,
        msg: orders,
      };
    } else {
      throw new NotFoundException("لا توجد طلبات");
    }
  }
  async add(
    productId: string,
    userId: string,
  ): Promise<IResponse> {
    return await this.orderRepository.add(productId, userId);
  }


}
