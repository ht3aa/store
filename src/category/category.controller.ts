import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Patch,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags  } from '@nestjs/swagger';
import { IResponse } from 'src/interfaces/response.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';
import { CategoryService } from './category.service';
import { AddCategoryDto } from './dtos/category.add.dto';
import { FindCategoryDto } from './dtos/category.find.dto';
import { UpdateCategoryDto } from './dtos/category.update.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiResponse({ status: 201, description: 'تمت أضافة قسم جديد' })
  @UsePipes(ValidationPipe)
  @Post('/')
  @UseInterceptors(FileInterceptor('photo'))
  async add(
    @UploadedFile() file: Express.Multer.File,
    @Body() addCategoryDto: AddCategoryDto,
  ): Promise<IResponse> {
    return await this.categoryService.add(file, addCategoryDto);
  }


  @ApiResponse({ status: 200, description: 'مجموعة من المنتجات' })
  @UsePipes(ValidationPipe)
  @Post('/find')
  async findWithFilters(
    @Body() findCategoryDto: FindCategoryDto,
  ): Promise<IResponse> {
    return await this.categoryService.findWithFilters(findCategoryDto);
  }

  @ApiResponse({ status: 200, description: 'patient data' })
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<IResponse> {
    return await this.categoryService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'تمت تعديل معلومات المريض بنجاح.' })
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('photo'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<IResponse> {
    return await this.categoryService.update(id, file, updateCategoryDto);
  }

  @ApiResponse({ status: 200, description: 'تمت حذف المريض بنجاح.' })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<IResponse> {
    return await this.categoryService.delete(id);
  }
}
