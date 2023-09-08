import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UsersRole } from '../constants/constants';
import { Cart } from '../cart/cart.entity';
import { Order } from '../order/order.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: UsersRole.USER })
  role: UsersRole;

  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn()
  cart: Cart;
 
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
