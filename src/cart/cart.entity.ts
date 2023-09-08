import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Users } from '../users/users.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Users, (user) => user.cart)
  user: Users;

  @ManyToMany(() => Product, (product) =>  product.cart , {
    onDelete: 'CASCADE',   
  })
  @JoinTable()
  products: Product[];
  
}
