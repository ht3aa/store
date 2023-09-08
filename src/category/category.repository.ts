import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Category } from './category.entity';
import { AddCategoryDto } from './dtos/category.add.dto';
import { IResponse } from 'src/interfaces/response.interface';
import {
  deleteFilesFromFirebase,
  uploadFilesToFirebase,
} from 'src/utils/helper';
import { FindCategoryDto } from './dtos/category.find.dto';
import { UpdateCategoryDto } from './dtos/category.update.dto';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async findWithFilters(findCategoryDto: FindCategoryDto): Promise<IResponse> {
    const { name, withProductsRelation } = findCategoryDto;
    const query = this.createQueryBuilder('category');

    if (name) {
      query.andWhere('category.name = :name', { name });
    }

    if (withProductsRelation) {
      query.leftJoinAndSelect('category.products', 'product');
    }

    const products = await query.getMany();

    return {
      status: HttpStatus.OK,
      msg: products,
    };
  }

  async add(
    file: Express.Multer.File,
    addCategoryDto: AddCategoryDto,
  ): Promise<IResponse> {
    const { name } = addCategoryDto;
    const category = new Category();
    const photoUrl = await uploadFilesToFirebase([file]);

    category.url = photoUrl[0];
    category.name = name;

    await this.dataSource.manager.save(category);

    return {
      status: HttpStatus.CREATED,
      msg: 'تمت اضافة القسم بنجاح',
    };
  }

  async updateData(
    id: string,
    file: Express.Multer.File,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<IResponse> {
    const { name } = updateCategoryDto;
    const category = await this.findOne({
      where: { id },
    });

    if (category) {


      if (file) {
        await deleteFilesFromFirebase([category.url]);

        const photosUrl = await uploadFilesToFirebase([file]);
        category.url = photosUrl[0];

        await this.dataSource.manager.save(category);
      }

      category.name = name;
      await this.dataSource.manager.save(category);

      return {
        status: HttpStatus.OK,
        msg: 'تمت تعديل معلومات القسم بنجاح.',
      };


    } else {
      throw new NotFoundException("القسم غير موجود");
    }

  }
}
