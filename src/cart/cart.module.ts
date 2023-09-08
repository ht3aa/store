import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { ProductService } from 'src/product/product.service';
import { ProductRepository } from 'src/product/product.repository';
import { CategoryService } from 'src/category/category.service';
import { CategoryRepository } from 'src/category/category.repository';

@Module({
  controllers: [CartController],
  providers: [CartService, CategoryService, CategoryRepository, CartRepository, UsersRepository, UsersService, ProductService, ProductRepository],
  exports: [
    CartService,
    CartRepository,
  ]
})
export class CartModule { }
