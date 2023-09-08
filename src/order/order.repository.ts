import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from './order.entity';
import { IResponse } from '../interfaces/response.interface';
import { UsersService } from 'src/users/users.service';
import { ProductService } from 'src/product/product.service';
import { handelOrderErrors } from 'src/utils/handelErrors';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(
    private dataSource: DataSource,
    private usersService: UsersService,
    private productService: ProductService,
  ) {
    super(Order, dataSource.createEntityManager());
  }

  async add(
    productId: string,
    userId: string,
  ): Promise<IResponse> {

    const { msg: product } = await this.productService.findOne(productId);

    let { msg: user } = await this.usersService.findOne(userId);
    if (product && user) {
      const order = new Order();
      order.user = user;
      order.product = product

      try {
        await this.dataSource.manager.save(order);
      } catch (error) {
        console.log(error)
        handelOrderErrors(error)
      }

    } else {
      throw new NotFoundException("المنتج او المستخدم غير موجود");
    }
    let { msg } = await this.usersService.findOne(userId);

    return {
      status: HttpStatus.CREATED,
      msg: msg.orders,
    };
  }
}
