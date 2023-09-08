import { Injectable, HttpException, HttpStatus, NotFoundException} from '@nestjs/common';
import { IResponse } from '../interfaces/response.interface';
import { handelCartErrors } from 'src/utils/handelErrors';
import { ProductService } from 'src/product/product.service';
import { CartRepository } from './cart.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class CartService {

  constructor(
    private usersService: UsersService,
    private usersRepository: UsersRepository,
    private cartRepository: CartRepository,
    private productService: ProductService
  ) { }

  async findOneByUserId(id: string): Promise<IResponse> {
    try {
      const cart = await this.cartRepository.findOne({
        where: {
          user: {
            id
          }
        },
        relations: ['products', 'user', 'products.photos'],
      });
      if (cart) {
        return {
          status: HttpStatus.OK,
          msg: cart,
        };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      console.log(error);
      return handelCartErrors(error.code, error.status);
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const cart = await this.cartRepository.findOne({
        where: { id },
        relations: ['products', 'user', 'products.photos'],
      });
      if (cart) {
        return {
          status: HttpStatus.OK,
          msg: cart,
        };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      console.log(error);
      return handelCartErrors(error.code, error.status);
    }
  }

  async add(
    productId: string,
    userId: string,
  ): Promise<IResponse> {
    try {
      const { msg: product } = await this.productService.findOne(productId);

      const { msg: user } = await this.usersService.findOne(userId);


      if (product && user) {

        const { msg: cart } = await this.findOne(user.cart.id)

        cart.products.push(product);
        await this.cartRepository.save(cart);

        return {
          status: HttpStatus.CREATED,
          msg: 'تمت أضافة المنتج الى الحقيبة',
        };

      } else {
        throw new HttpException('المنتج او المستخدم غير موجود', 2);
      }

    } catch (error) {
      console.log(error);
      return handelCartErrors(error.code, error.status);
    }
  }


  async delete(id: string, productId: string): Promise<IResponse> {
    try {
      const { msg: cart } = await this.findOne(id);

      if (cart) {

        cart.products = cart.products.filter(product => product.id !== productId);
        await this.cartRepository.save(cart);

        return {
          status: HttpStatus.OK,
          msg: cart,
        };

      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      console.log(error);
      return handelCartErrors(error.code, error.status);
    }
  }
}
