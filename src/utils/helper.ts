import { HttpStatus } from '@nestjs/common';
import { Product } from '../product/product.entity';
import { storage } from 'src/config/firebase.config';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';


export const findOneResponse = (entity: Product, msg: string) => {
  if (entity) {
    return {
      status: HttpStatus.OK,
      msg: entity,
    };
  } else {
    return {
      status: HttpStatus.BAD_REQUEST,
      msg,
    };
  }
};

const randomString = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const deleteFilesFromFirebase = async (urls: Array<string>) => {
  urls.forEach(async (url: any) => {
    const urlRef = ref(storage, url);
    await deleteObject(urlRef);
  });
};

export const uploadFilesToFirebase = async (files: Array<object>) => {

  const urls = await Promise.all(
    files.map(async (file: any) => {
      const photoRef = ref(storage, randomString() + file.originalname);
      await uploadBytes(photoRef, file.buffer);
      const photoUrl = await getDownloadURL(photoRef);
  
      return photoUrl;
    }),
  );

  return urls;
};
