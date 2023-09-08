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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { AddProductDto } from './dtos/product.add.dto';
import { IResponse } from 'src/interfaces/response.interface';
import { FindProductDto } from './dtos/product.find.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common/decorators/http/route-params.decorator';
import { UpdateProductDto } from './dtos/product.update.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiResponse({ status: 201, description: 'تمت اضافة المنتج بنجاح' })
  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  async add(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() addProductDto: AddProductDto,
  ): Promise<IResponse> {
    return await this.productService.add(files, addProductDto);
  }

  @ApiResponse({ status: 200, description: 'مجموعة من المنتجات' })
  @UsePipes(ValidationPipe)
  @Post('/find')
  async findWithFilters(
    @Body() findProductDto: FindProductDto,
  ): Promise<IResponse> {
    return await this.productService.findWithFilters(findProductDto);
  }

  @ApiResponse({ status: 200, description: 'معلومات المنتج' })
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<IResponse> {
    return await this.productService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'تم تعديل المنتج' })
  @Patch('/:id')
  @UseInterceptors(FilesInterceptor('photos'))
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<IResponse> {
    return await this.productService.update(id, files, updateProductDto);
  }

  @ApiResponse({ status: 200, description: 'تم حذف المنتج' })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<IResponse> {
    return await this.productService.delete(id);
  }
}
