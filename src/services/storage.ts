import {
  batteriesStorageRef,
  coilsStorageRef,
  photosStorageRef,
  usersStorageRef,
  storage,
  remoteConfig
} from '../utils/firebase'

import { StorageReference, getDownloadURL, uploadBytes, ref } from 'firebase/storage'
import { getString } from 'firebase/remote-config'

export enum ImageType {
  USER = 'user',
  PHOTO = 'gear',
  COIL = 'coil',
  BATTERY = 'battery',
  BANNER = 'banner',
}

export async function getBatteryUrl (uid: string): Promise<string | undefined> {
  return await getImageUrl(ImageType.BATTERY, uid)
}

export async function getPhotoUrl (uid: string): Promise<string | undefined> {
  return await getImageUrl(ImageType.PHOTO, uid)
}

export async function getAvatarUrl (uid: string): Promise<string | undefined> {
  return await getImageUrl(ImageType.USER, uid)
}

export async function getCoilUrl (uid: string): Promise<string | undefined> {
  return await getImageUrl(ImageType.COIL, uid)
}

export async function getBannerUrl (bannerProperties: BannerProperties): Promise<string | undefined> {
  return await getImageUrl(ImageType.BANNER, bannerProperties.imageGs)
}

export async function getImageUrl (type: ImageType, uid: string): Promise<string | undefined> {
  switch (type) {
    case ImageType.PHOTO:
      return await getDownloadUrl(photosStorageRef(uid))
    case ImageType.COIL:
      return await getDownloadUrl(coilsStorageRef(uid))
    case ImageType.USER:
      return await getDownloadUrl(usersStorageRef(uid))
    case ImageType.BATTERY:
      return await getDownloadUrl(batteriesStorageRef(uid))
    case ImageType.BANNER:
      return await getDownloadUrlByUri(uid)
    default:
      throw Error('Unsupported type')
  }
}

async function getDownloadUrl (
  storageRef: StorageReference
): Promise<string | undefined> {
  return await new Promise((resolve) => {
    getDownloadURL(storageRef)
      .then((url) => {
        resolve(url)
      })
      .catch(() => {
        resolve(undefined)
      })
  })
}

async function getDownloadUrlByUri (uri: string): Promise<string | undefined> {
  return await new Promise((resolve) => {
    getDownloadURL(ref(storage(), uri))
      .then((url) => {
        resolve(url)
      })
      .catch(() => {
        resolve(undefined)
      })
  })
}

export async function uploadPhoto (imageBlob: Blob | File, uid: string) {
  return await uploadBytes(photosStorageRef(uid), imageBlob)
}

export async function uploadAvatar (imageBlob: Blob | File, uid: string) {
  return await uploadBytes(usersStorageRef(uid), imageBlob)
}

export interface BannerProperties {
  name: string
  linkUrl: string
  imageGs: string
}

export async function getAdImageProperties (parameterKey: string): Promise<BannerProperties> {
  return JSON.parse(getString(remoteConfig(), parameterKey)) as BannerProperties
}
