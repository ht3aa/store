import { HttpStatus } from '@nestjs/common';
import { IResponse } from 'src/interfaces/response.interface';

export const handelProductErrors = (code: string = null, status: number = null): IResponse => {
  if (code === '23505') {
    return {
      status: HttpStatus.BAD_REQUEST,
      msg: 'أسم المنتج موجود بالفعل.',
    };
  } else if (status === 404) {
    return {
      status: HttpStatus.NOT_FOUND,
      msg: 'منتج غير موجود',
    };
  } else {
    return {
      status: HttpStatus.BAD_REQUEST,
      msg: 'حدثت مشكلة قم بالأتصال على المطور على الرقم  07708246418',
    };
  }
};

export const handelCategoryErrors = (code: string = null, status: number = null): IResponse => {
  if (code === '23505') {
    return {
      status: HttpStatus.BAD_REQUEST,
      msg: 'اسم القسم موجود بالفعل',
    };
  } else if (status === 404) {
    return {
      status: HttpStatus.NOT_FOUND,
      msg: 'القسم غير موجود',
    };
  } else {
    return {
      status: HttpStatus.BAD_REQUEST,
      msg: 'حدثت مشكلة قم بالأتصال على المطور على الرقم  07708246418',
    };
  }
};

export const handelCartErrors = (code: string = null, status: number = null): IResponse => {
  if (code === '23505') {
    return {
      status: HttpStatus.BAD_REQUEST,
      msg: 'المنتج موجود في الحقيبة',
    };
  } else if (status === 404) {
    return {
      status: HttpStatus.NOT_FOUND,
      msg: 'الحقيبة غير موجودة',
    };
  } else {
    return {
      status: HttpStatus.BAD_REQUEST,
      msg: 'حدثت مشكلة قم بالأتصال على المطور على الرقم  07708246418',
    };
  }
};

export const handelOrderErrors = (code: string = null, status: number = null): IResponse => {
  if (code === '23505') {
    return {
      status: HttpStatus.BAD_REQUEST,
      msg: 'الطلبية موجودة بالفعل',
    };
  } else if (status === 404) {
    return {
      status: HttpStatus.NOT_FOUND,
      msg: 'الطلبية غير موجودة',
    };
  } else {
    return {
      status: HttpStatus.BAD_REQUEST,
      msg: 'حدثت مشكلة قم بالأتصال على المطور على الرقم  07708246418',
    };
  }
};

export const handelUsersErrors = (code: string = null, status: number = null): IResponse => {
  if (code === '23505') {
    return {
      status: HttpStatus.BAD_REQUEST,
      msg: 'المستخدم موجود بالفعل',
    };
  } else if (status === 404) {
    return {
      status: HttpStatus.NOT_FOUND,
      msg: 'مستخدم غير موجود',
    };
  } else if (status === 2) {
    return {
      status: HttpStatus.BAD_REQUEST,
      msg: 'المنتج او المستخدم غير موجود',
    };
  } else if (status === 401) {   
    return {
      status: HttpStatus.UNAUTHORIZED,
      msg: 'ممنوع الدخول'
    }
  } else {
    return {
      status: HttpStatus.BAD_REQUEST,
      msg: 'حدثت مشكلة قم بالأتصال على المطور على الرقم  07708246418',
    };
  }
};
