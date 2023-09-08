import { Product } from '../product/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany, 
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  url: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
