import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Photo } from './photo.entity';
import { Cart } from '../cart/cart.entity';
import { Category } from '../category/category.entity';
import { Order } from 'src/order/order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  quantity: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @OneToOne(() => Photo, (photo) => photo.product, {
    onDelete: 'CASCADE',
  })
  photos: Photo;

  @OneToOne(() => Cart, (cart) => cart.products, {
    onDelete: 'CASCADE',   
  })
  cart: Cart;

  @OneToOne(() => Order, (order) => order.product, {
    onDelete: 'CASCADE',   
  })
  order: Order;
}
