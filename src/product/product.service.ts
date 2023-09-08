import { deleteFilesFromFirebase } from '../utils/helper';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { AddProductDto } from './dtos/product.add.dto';
import { IResponse } from 'src/interfaces/response.interface';
import { handelProductErrors } from 'src/utils/handelErrors';
import { FindProductDto } from './dtos/product.find.dto';
import { UpdateProductDto } from './dtos/product.update.dto';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
  ) { }


  async add(
    files: Array<Express.Multer.File>,
    addProductDto: AddProductDto,
  ): Promise<IResponse> {
    return this.productRepository.add(files, addProductDto);
  }

  async findWithFilters(findProductDto: FindProductDto): Promise<IResponse> {
    return await this.productRepository.findWithFilters(findProductDto);
  }

  async findOne(id: string): Promise<IResponse> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['photos'],
    });
    if (product) {
      return {
        status: HttpStatus.OK,
        msg: product,
      };
    } else {
      throw new NotFoundException("المنتج غير موجود");
    }
  }

  async update(
    id: string,
    files: Array<Express.Multer.File>,
    updateProductDto: UpdateProductDto,
  ): Promise<IResponse> {
    return await this.productRepository.updateData(id, files, updateProductDto);
  }

  async delete(id: string): Promise<IResponse> {
    const product = await this.productRepository.findOne({
      relations: ['photos'],
      where: { id },
    });

    if (product) {

      await deleteFilesFromFirebase(product.photos.url);
      await this.productRepository.remove(product);

      return {
        status: HttpStatus.OK,
        msg: 'تم حذف المنتج.',
      };

    } else {
      throw new NotFoundException("المنتج غير موجود");
    }
  }
}
