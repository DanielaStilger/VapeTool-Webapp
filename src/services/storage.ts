import {
  batteriesStorageRef,
  coilsStorageRef,
  photosStorageRef,
  usersStorageRef,
  storage,
  remoteConfig,
} from '../utils/firebase';

import { StorageReference, getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { getString } from 'firebase/remote-config';

export enum ImageType {
  USER = 'user',
  PHOTO = 'gear',
  COIL = 'coil',
  BATTERY = 'battery',
  BANNER = 'banner',
}

export function getBatteryUrl(uid: string): Promise<string | undefined> {
  return getImageUrl(ImageType.BATTERY, uid);
}

export function getPhotoUrl(uid: string): Promise<string | undefined> {
  return getImageUrl(ImageType.PHOTO, uid);
}

export function getAvatarUrl(uid: string): Promise<string | undefined> {
  return getImageUrl(ImageType.USER, uid);
}

export function getCoilUrl(uid: string): Promise<string | undefined> {
  return getImageUrl(ImageType.COIL, uid);
}

export function getBannerUrl(bannerProperties: BannerProperties): Promise<string | undefined> {
  return getImageUrl(ImageType.BANNER, bannerProperties.imageGs);
}

export function getImageUrl(type: ImageType, uid: string): Promise<string | undefined> {
  switch (type) {
    case ImageType.PHOTO:
      return getDownloadUrl(photosStorageRef(uid));
    case ImageType.COIL:
      return getDownloadUrl(coilsStorageRef(uid));
    case ImageType.USER:
      return getDownloadUrl(usersStorageRef(uid));
    case ImageType.BATTERY:
      return getDownloadUrl(batteriesStorageRef(uid));
    case ImageType.BANNER:
      return getDownloadUrlByUri(uid);
    default:
      throw Error('Unsupported type');
  }
}

function getDownloadUrl(
  storageRef: StorageReference,
): Promise<string | undefined> {
  return new Promise((resolve) => {
    getDownloadURL(storageRef)
      .then((url) => {
        resolve(url);
      })
      .catch(() => {
        resolve(undefined);
      });
  });
}

function getDownloadUrlByUri(uri: string): Promise<string | undefined> {
  return new Promise((resolve) => {
    getDownloadURL(ref(storage(), uri))
      .then((url) => {
        resolve(url);
      })
      .catch(() => {
        resolve(undefined);
      });
  });
}

export async function uploadPhoto(imageBlob: Blob | File, uid: string) {
  return uploadBytes(photosStorageRef(uid), imageBlob);
}

export async function uploadAvatar(imageBlob: Blob | File, uid: string) {
  return uploadBytes(usersStorageRef(uid), imageBlob);
}

export interface BannerProperties {
  name: string;
  linkUrl: string;
  imageGs: string;
}

export async function getAdImageProperties(parameterKey: string): Promise<BannerProperties> {
  return JSON.parse(getString(remoteConfig(), parameterKey)) as BannerProperties;
}