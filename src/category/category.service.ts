import { deleteFilesFromFirebase, findOneResponse } from '../utils/helper';
import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { AddCategoryDto } from './dtos/category.add.dto';
import { IResponse } from 'src/interfaces/response.interface';
import { handelCategoryErrors } from 'src/utils/handelErrors';
import { FindCategoryDto } from './dtos/category.find.dto';
import { UpdateCategoryDto } from './dtos/category.update.dto';

@Injectable()
export class CategoryService {

  constructor(private categoryRepository: CategoryRepository) { }

  async add(
    file: Express.Multer.File,
    addCategoryDto: AddCategoryDto,
  ): Promise<IResponse> {
    return this.categoryRepository.add(file, addCategoryDto);
  }


  async findWithFilters(findCategoryDto: FindCategoryDto): Promise<IResponse> {
    return await this.categoryRepository.findWithFilters(findCategoryDto);
  }

  async findOne(id: string): Promise<IResponse> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products', 'products.photos'],
    });
    if (category) {
      return {
        status: HttpStatus.OK,
        msg: category,
      };
    } else {
      throw new NotFoundException("القسم غير موجود");
    }
  }

  async update(
    id: string,
    file: Express.Multer.File,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<IResponse> {
    return await this.categoryRepository.updateData(id, file, updateCategoryDto);
  }

  async delete(id: string): Promise<IResponse> {
      const category = await this.categoryRepository.findOne({
        relations: ['products', 'products.photos'],
        where: { id },
      });
      if (category) {
        const productsPhotosUrls = category.products.reduce((acc, product) => {
          acc.push(...product.photos.url)
          return acc;
        }, [])

        await deleteFilesFromFirebase([category.url, ...productsPhotosUrls]);
        await this.categoryRepository.remove(category);

        return {
          status: HttpStatus.OK,
          msg: 'تم حذف المجموعة.',
        };

      } else {
        throw new NotFoundException("القسم غير موجود");
      }
  }
}
