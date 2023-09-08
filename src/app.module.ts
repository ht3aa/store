import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typorm.config';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/constants';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    ProductModule,
    UsersModule,
    CategoryModule,
    CartModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      global: true,
    }),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
