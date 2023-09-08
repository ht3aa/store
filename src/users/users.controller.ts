import { 
  Controller, 
  Get, 
  Post,
  Body, 
  Param,
  Delete, 
  UsePipes, 
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { IResponse } from '../interfaces/response.interface';
import { FindUsersDto } from './dtos/users.find.dto';
import { AddUsersDto } from './dtos/users.add.dto';
import { LoginUsersDto } from './dtos/users.login.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 201, description: 'تمت اضافة المستخدم بنجاح' })
  @UsePipes(ValidationPipe)
  @Post()
  async add(
    @Body() addUsersDto: AddUsersDto,
  ): Promise<IResponse> {
    return await this.usersService.add(addUsersDto);
  }

  
  @ApiResponse({ status: 200, description: 'مجموعة من المستخدمين' })
  @UsePipes(ValidationPipe)
  @Post('/find')
  async findWithFilters(
    @Body() findUsersDto: FindUsersDto,
  ): Promise<IResponse> {
    return await this.usersService.findWithFilters(findUsersDto);
  }
  
  @ApiResponse({ status: 200, description: 'معلومات المستخدم' })
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<IResponse> {
    return await this.usersService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'تم تسجيل الدخول بنجاح' })
  @UsePipes(ValidationPipe)
  @Post('/login')
  async login(
    @Body() loginUsersDto: LoginUsersDto,
  ): Promise<IResponse> {
    return await this.usersService.login(loginUsersDto);
  }
 
  @ApiResponse({ status: 200, description: 'تم حذف المستخدم' })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<IResponse> {
    return await this.usersService.delete(id);
  }
}
