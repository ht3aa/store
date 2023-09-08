import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from './users.entity';
import { FindUsersDto } from './dtos/users.find.dto';
import { IResponse } from '../interfaces/response.interface';
import { HttpStatus } from '@nestjs/common';
import { AddUsersDto } from './dtos/users.add.dto';
import { Cart } from '../cart/cart.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async findWithFilters(findUsersDto: FindUsersDto, deleteUserPass = true): Promise<IResponse> {
    const { username, email } = findUsersDto;
    const query = this.createQueryBuilder('users');

    if (username) {
      query.andWhere('users.username = :username', { username });
    }
    if (email) {
      query.andWhere('users.email = :email', { email });
    }

    let users = await query.getMany();

    users = users.map(user => {
      if(deleteUserPass) delete user.password

      return user
    })

    return {
      status: HttpStatus.OK,
      msg: users,
    };
  }

  async add(
    addUsersDto: AddUsersDto,
  ): Promise<IResponse> {
    const { username, email, password } = addUsersDto;
    const user = new Users();
    const cart = new Cart();
    user.username = username;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.cart = cart;

    await this.dataSource.manager.save(cart);
    await this.dataSource.manager.save(user);

    return {
      status: HttpStatus.CREATED,
      msg: 'تمت اضافة المستخدم بنجاح',
    };
  }
}
