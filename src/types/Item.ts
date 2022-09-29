import Photo from './Photo';
import Post from './Post';
import Link from './Link';
import Coil from './Coil';
import Liquid from './Liquid';

export type Item = Photo | Post | Link | Coil | Liquid;

export enum ItemName {
  PHOTO = 'photo',
  POST = 'post',
  LINK = 'link',
  COIL = 'coil',
  LIQUID = 'liquid',
}
