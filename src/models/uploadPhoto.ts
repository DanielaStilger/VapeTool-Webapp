import ReactCrop from 'react-image-crop'
import { Author } from '@vapetool/types'
import { message } from 'antd'
import { createPhoto } from '@/services/items'
import { useState } from 'react'
import useRouter from '@/utils/useRouter'
import { useAuth } from '@/context/FirebaseAuthContext'
import { notifyToLogIn } from '@/services/user'

export const UPLOAD_PHOTO = 'uploadPhoto'
export const SET_SRC = 'setSrc'
export const SET_CROP = 'setCrop'
export const SET_CROPPED_IMAGE = 'setCroppedImage'
export const RESET = 'reset'
export const SET_DESCRIPTION = 'setDescription'
export const SHOW_PHOTO_CHOOSER = 'showPhotoChooser'
export const HIDE_PHOTO_CHOOSER = 'hidePhotoChooser'
export const SUBMIT = 'submit'

export interface CroppedImage {
  imageUrl?: string
  imageBlob?: Blob | File
  width?: number
  height?: number
}

export interface UploadPhotoState {
  src?: string
  crop?: ReactCrop.Crop
  croppedImageUrl?: string
  croppedImageBlob?: Blob | File
  description?: string
  width?: number
  height?: number
  showPhotoChooser?: boolean
  cancelled?: boolean
}

export const useUploadPhotoModel = () => {
  const auth = useAuth()
  const [src, setSrc] = useState<string | undefined>(undefined)
  const [crop, setCrop] = useState<ReactCrop.Crop | undefined>(undefined)
  const [croppedImage, setCroppedImage] = useState<CroppedImage>({})
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | undefined>(undefined)
  const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | File | undefined>(undefined)
  const [description, setDescription] = useState<string>('')
  const [width, setWidth] = useState<number | undefined>(undefined)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const [showPhotoChooser, setShowPhotoChooser] = useState<boolean>(false)
  const [cancelled, setCancelled] = useState<boolean>(false)

  const reset = () => {
    setSrc(undefined)
    setCrop(undefined)
    setCroppedImageUrl(undefined)
    setCroppedImageBlob(undefined)
    setDescription('')
    setWidth(undefined)
    setHeight(undefined)
  }

  const submitPhoto = async () => {
    if (!auth.dbUser) {
      console.error('User not logged in')
      notifyToLogIn()
      return
    }
    try {
      const author = new Author(auth.dbUser.uid, auth.dbUser.display_name)
      await createPhoto(
        croppedImage.imageBlob,
        description,
        author,
        croppedImage.height,
        croppedImage.width
      )
      message.success('Successfully published photo')
      reset()
      useRouter().replace('/cloud')
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message)
      }
    }
  }

  return {
    src,
    setSrc,
    crop,
    setCrop,
    croppedImage,
    setCroppedImage,
    croppedImageUrl,
    setCroppedImageUrl,
    croppedImageBlob,
    setCroppedImageBlob,
    description,
    setDescription,
    width,
    setWidth,
    height,
    setHeight,
    showPhotoChooser,
    setShowPhotoChooser,
    cancelled,
    setCancelled,
    reset,
    submitPhoto
  }
}
