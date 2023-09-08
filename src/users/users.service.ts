import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { FindUsersDto } from './dtos/users.find.dto';
import { IResponse } from '../interfaces/response.interface';
import { AddUsersDto } from './dtos/users.add.dto';
import { LoginUsersDto } from './dtos/users.login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) { }


  async add(
    addUsersDto: AddUsersDto,
  ): Promise<IResponse> {
    return this.usersRepository.add(addUsersDto);
  }


  async findWithFilters(findUsersDto: FindUsersDto): Promise<IResponse> {
    return await this.usersRepository.findWithFilters(findUsersDto);
  }

  async findOne(id: string): Promise<IResponse> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: [
        'cart',
        'cart.products',
        'cart.products.photos',
        'orders',
        'orders.product',
        'orders.product.photos'
      ]
    });
    if (user) {
      delete user.password

      return {
        status: HttpStatus.OK,
        msg: user,
      };
    } else {
      throw new NotFoundException();
    }
  }

  async login(loginUsersDto: LoginUsersDto): Promise<IResponse> {
    const { msg } = await this.usersRepository.findWithFilters({ username: loginUsersDto.username, email: null }, false);
    if (msg.length > 0) {
      const user = msg[0];
      if (!(await bcrypt.compare(loginUsersDto.password, user.password))) {
        throw new NotFoundException("كلمة السر او اسم المستخدم غير صحيحة");
      }

      const payload = { userId: user.id, username: user.username, email: user.email, role: user.role };

      return {
        status: HttpStatus.OK,
        msg: 'تم تسجيل الدخول بنجاح',
        accessToken: await this.jwtService.signAsync(payload)
      }
    } else {
      throw new NotFoundException("كلمة السر او اسم المستخدم غير صحيحة");
    }
  }


  async delete(id: string): Promise<IResponse> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (user) {

      await this.usersRepository.remove(user);

      return {
        status: HttpStatus.OK,
        msg: 'تم حذف المستخدم',
      };

    } else {
      throw new NotFoundException();
    }
  }
}
