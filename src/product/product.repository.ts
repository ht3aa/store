import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository, DataSource } from 'typeorm';
import { AddProductDto } from './dtos/product.add.dto';
import { IResponse } from 'src/interfaces/response.interface';
import { FindProductDto } from './dtos/product.find.dto';
import { Photo } from './photo.entity';
import { UpdateProductDto } from './dtos/product.update.dto';
import {
  deleteFilesFromFirebase,
  uploadFilesToFirebase,
} from 'src/utils/helper';
import { CategoryService } from 'src/category/category.service';


@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource, private categoryService: CategoryService) {
    super(Product, dataSource.createEntityManager());
  }

  async findWithFilters(findProductDto: FindProductDto): Promise<IResponse> {
    const { name, withPhotoRelation } = findProductDto;
    const query = this.createQueryBuilder('product');

    if (name) {
      query.andWhere('product.name = :name', { name });
    }

    if (withPhotoRelation) {
      query.leftJoinAndSelect('product.photos', 'photo');
    }

    const products = await query.getMany();

    return {
      status: HttpStatus.OK,
      msg: products,
    };
  }

  async add(
    files: Array<Express.Multer.File>,
    addProductDto: AddProductDto,
  ): Promise<IResponse> {
    const { name, description, price, quantity, categoryName } = addProductDto;
    const product = new Product();
    const photo = new Photo();

    const { msg: category } = await this.categoryService.findWithFilters(
      { name: categoryName, withProductsRelation: false },
    );
    const photosUrl = await uploadFilesToFirebase(files);

    photo.url = photosUrl;
    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.photos = photo;
    product.category = category[0];

    await this.dataSource.manager.save(photo);
    await this.dataSource.manager.save(product);
    await this.dataSource.manager.save(category[0]);

    return {
      status: HttpStatus.CREATED,
      msg: 'تمت اضافة المنتج بنجاح',
    };
  }

  async updateData(
    id: string,
    files: Array<Express.Multer.File>,
    updateProductDto: UpdateProductDto,
  ): Promise<IResponse> {
    const { name, description, price, quantity } = updateProductDto;
    const product = await this.findOne({
      where: { id },
      relations: ['photos'],
    });

    if (product) {

      if (files.length !== 0) {
        await deleteFilesFromFirebase(product.photos.url);

        const photosUrl = await uploadFilesToFirebase(files);
        product.photos.url = photosUrl;

        await this.dataSource.manager.save(product.photos);
      }

      product.name = name;
      product.description = description;
      product.price = price;
      product.quantity = quantity;
      await this.dataSource.manager.save(product);

      return {
        status: HttpStatus.OK,
        msg: 'تم تعديل المنتج',
      };


    } else {
      throw new NotFoundException("المنتج غير موجود");
    }

  }
}
