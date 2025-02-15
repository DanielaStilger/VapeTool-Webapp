import React, { useEffect, useState } from 'react'
import { Col, Row, Typography } from 'antd'
import { FormattedMessage } from 'react-intl'
import { CameraOutlined, LinkOutlined, MessageOutlined } from '@ant-design/icons'
import UserCard from '@/pages/user/profile/components/UserCard'
import { ItemName } from '@/types'
import UserPhotos from './components/UserItems/UserPhotos'
import UserPosts from './components/UserItems/UserPosts'
import UserLinks from './components/UserItems/UserLinks'
import UserLiquids from './components/UserItems/UserLiquids'
import UserCoils from './components/UserItems/UserCoils'
import useStyles from './style'
import { useProfileModel } from '@/models/profile'
import { useAuth } from '@/context/FirebaseAuthContext'
import { useParams } from 'react-router-dom'
import { Card } from 'flowbite-react'

export const UserProfile: React.FC = () => {
  const { loadingProfile, userProfile, fetchUserProfile } = useProfileModel()
  const { dbUser } = useAuth()
  const [tabKey, setTabKey] = useState(ItemName.PHOTO)
  const { styles } = useStyles()

  const params = useParams();
  const userId = params.userId ?? dbUser?.uid;

  const isCurrentUser = userId === dbUser?.uid

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId)
    }
  }, [userId])

  if (!userId) {
    return <Typography.Paragraph>Inital state have not been loaded</Typography.Paragraph>
  }

  const renderContentByTabKey = () => {
    switch (tabKey) {
      case ItemName.PHOTO:
        return <UserPhotos userId={userId} />
      case ItemName.POST:
        return <UserPosts userId={userId} />
      case ItemName.LINK:
        return <UserLinks userId={userId} />
      case ItemName.COIL:
        return <UserCoils userId={userId} />
      case ItemName.LIQUID:
        return <UserLiquids userId={userId} />
      default:
        throw new Error(`Unknown tab: ${tabKey}`)
    }
  }

  const activeClass = (type: ItemName): string => (tabKey === type ? styles.active : '')

  return (
    <Card>
      <Row justify='space-around'>
        <Col xs={24} md={24} xl={20} xxl={11}>
          <UserCard
            isCurrentUser={isCurrentUser}
            currentUser={dbUser}
            userProfile={userProfile}
            isLoading={loadingProfile}
          />
        </Col>
      </Row>
      <Row justify='space-around'>
        <Col xs={24} md={24} xl={20} xxl={11}>
          <div className={styles.itemsAndControl}>
            <div className={styles.controlContainer}>
              <div className={styles.controlPanel}>
                <ul>
                  <li onClick={() => setTabKey(ItemName.PHOTO)} className={`${activeClass(ItemName.PHOTO)}`}>
                    <CameraOutlined className={styles.icon} />
                    <span className={styles.label}>
                      <FormattedMessage id='user.photos' defaultMessage='Photos' />
                    </span>
                  </li>
                  <li onClick={() => setTabKey(ItemName.POST)} className={`${activeClass(ItemName.POST)}`}>
                    <MessageOutlined className={styles.icon} />
                    <span className={styles.label}>
                      <FormattedMessage id='user.posts' defaultMessage='Posts' />
                    </span>
                  </li>
                  <li onClick={() => setTabKey(ItemName.LINK)} className={`${activeClass(ItemName.LINK)}`}>
                    <LinkOutlined className={styles.icon} />
                    <span className={styles.label}>
                      <FormattedMessage id='user.links' defaultMessage='Links' />
                    </span>
                  </li>
                  <li onClick={() => setTabKey(ItemName.COIL)} className={`${activeClass(ItemName.COIL)}`}>
                    <i className={styles.icon}>
                      <img
                        src='https://web.vapetool.app/menu_icons/coil_calculator.svg'
                        style={{ filter: 'invert(1)' }}
                        alt='coils'
                      />
                    </i>
                    <span className={styles.label}>
                      <FormattedMessage id='user.coils' defaultMessage='Coils' />
                    </span>
                  </li>
                  <li onClick={() => setTabKey(ItemName.LIQUID)} className={`${activeClass(ItemName.LIQUID)}`}>
                    <i className={styles.icon}>
                      <img
                        src='https://web.vapetool.app/menu_icons/liquid_blender.svg'
                        style={{ filter: 'invert(1)' }}
                        alt='liquids'
                      />
                    </i>
                    <span className={styles.label}>
                      <FormattedMessage id='user.liquids' defaultMessage='Liquids' />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.itemsPanel}>{renderContentByTabKey()}</div>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

