import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { CartService } from 'src/cart/cart.service';
import { CartRepository } from 'src/cart/cart.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, UsersService, UsersRepository, CategoryService, CategoryRepository, CartService, CartRepository],
  exports: [ProductService, ProductRepository],
})
export class ProductModule { }
