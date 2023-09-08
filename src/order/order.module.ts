import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { ProductService } from 'src/product/product.service';
import { ProductRepository } from 'src/product/product.repository';
import { CategoryService } from 'src/category/category.service';
import { CategoryRepository } from 'src/category/category.repository';

@Module({
  providers: [
    OrderService, 
    OrderRepository, 
    UsersService, 
    UsersRepository,
    ProductService,
    ProductRepository,
    CategoryService,
    CategoryRepository,
  ],
  controllers: [OrderController]
})
export class OrderModule {}
