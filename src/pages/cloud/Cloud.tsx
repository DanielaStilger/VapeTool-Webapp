import React, { useEffect } from 'react'
import { Affix, Button, List } from 'antd'
import useStyles from '@/components/ItemView/style'
import { PhotoView } from '@/components/ItemView'
import PhotoPreviewModal from '@/components/PreviewModal'
import PostView from '@/components/ItemView/PostView'
import { Link, Photo, Post } from '@/types'
import PageLoading from '../../components/PageLoading'
import LinkView from '../../components/ItemView/LinkView'
import { subscribeLinks, subscribePhotos, subscribePosts } from '../../services/items'

import { PlusOutlined } from '@ant-design/icons'
import { useCloudModel } from '../../models/cloud'
import useRouter from '../../utils/useRouter'
import { useAuth } from '../../context/FirebaseAuthContext'

const Cloud: React.FC = () => {
  const router = useRouter()
  const { styles } = useStyles()
  const onUploadPhotoClicked = () => router.push('/cloud/upload')
  const { setLinks, setPhotos, setPosts, posts, links, photos } = useCloudModel()

  const auth = useAuth()

  useEffect(() => subscribeLinks(setLinks), [])
  useEffect(() => subscribePhotos(setPhotos), [])
  useEffect(() => subscribePosts(setPosts), [])

  if (photos === undefined || posts === undefined || links === undefined) {
    return <PageLoading />
  }
  const items = [...photos, ...posts, ...links].sort(
    (a, b) => Number(b.creationTime) - Number(a.creationTime)
  )
  return (
    <React.Fragment>
      <List<Photo | Post | Link>
        className={styles.coverCardList}
        style={{ maxWidth: 614, margin: '0 auto' }}
        rowKey='uid'
        itemLayout='vertical'
        dataSource={items}
        renderItem={(item) => {
          if (item.$type === 'photo') {
            return <PhotoView item={item as Photo} />
          }
          if (item.$type === 'post') {
            return <PostView item={item as Post} />
          }
          if (item.$type === 'link') {
            return <LinkView item={item as Link} />
          }
          return <div />
        }}
      />
      <PhotoPreviewModal />
      {auth.firebaseUser && !auth.firebaseUser.isAnonymous && (
        <Affix offsetBottom={30}>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            shape='circle'
            size='large'
            onClick={onUploadPhotoClicked}
          />
        </Affix>
      )}
    </React.Fragment>
  )
}

export default Cloud
