import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { ProductService } from '../product/product.service';
import { ProductRepository } from 'src/product/product.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';

@Module({
  providers: [
    UsersService, 
    UsersRepository, 
    ProductService, 
    ProductRepository, 
    CategoryService, 
    CategoryRepository
  ],
  controllers: [UsersController],
  exports: [
    UsersService,
    UsersRepository,
  ]
})
export class UsersModule {}
