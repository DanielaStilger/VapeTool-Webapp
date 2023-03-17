import { Modal } from 'antd'
import * as React from 'react'
import PhotoView from '@/components/ItemView/PhotoView'
import { ItemName, Photo, Link, Post } from '@/types'
import PostView from '../ItemView/PostView'
import LinkView from '../ItemView/LinkView'
import { useAuth } from '@/context/FirebaseAuthContext'
import { usePreviewModel } from '@/models/preview'

const ItemPreviewModal: React.FC = () => {
  const auth = useAuth()
  const { selectedItem, unselectItem } = usePreviewModel()
  console.log(`selected ${selectedItem}`)
  const onCancel = () => unselectItem()
  if ((selectedItem == null) || !auth.dbUser || !auth.firebaseUser) {
    return <div />
  }
  let content
  if (selectedItem.$type === ItemName.PHOTO) {
    content = (
      <PhotoView item={selectedItem as Photo} />
    )
  } else if (selectedItem.$type === 'post') {
    content = (
      <PostView item={selectedItem as Post} />
    )
  } else {
    content = (
      <LinkView item={selectedItem as Link} />
    )
  }
  return (
    <Modal
      footer={null}
      centered
      bodyStyle={{ padding: 0 }}
      visible={selectedItem !== undefined}
      onCancel={onCancel}
    >
      {content}
    </Modal>
  )
}

export default ItemPreviewModal
