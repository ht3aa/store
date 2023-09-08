import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Users } from '../users/users.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;

  @OneToOne(() => Product, (product) =>  product.order , {
    onDelete: 'CASCADE',   
  })
  @JoinColumn()
  product: Product;
}
