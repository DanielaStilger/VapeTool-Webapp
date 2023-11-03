import { User as DatabaseUser } from '@vapetool/types'
import { UserProfile } from '@/models/profile'
import React, { useEffect, useState } from 'react'
import FirebaseImage from '@/components/StorageAvatar'
import { ImageType } from '@/services/storage'
import { Avatar, Button, Card, Col, Divider, Row } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UserTags from '@/pages/user/profile/components/UserCard/UserTags'
import { getCancelSubscriptionUrl, getUserWizard, getPaymentUrl } from '@/places/user.places'
import { getUserTotalContentCount, getUserTotalLikesCount } from '@/services/userCenter'
import { FormattedMessage } from 'react-intl'
import useStyles from './style'
import useRouter from '@/utils/useRouter'
import { useAuth } from '@/context/FirebaseAuthContext'

interface UserCardProps {
  isCurrentUser: boolean
  currentUser: DatabaseUser | null
  userProfile?: UserProfile
  isLoading: boolean
}

const UserCard: React.FC<UserCardProps> = ({
  userProfile: profile,
  isLoading,
  isCurrentUser,
  currentUser
}) => {
  const { styles } = useStyles()
  const { isUserPro } = useAuth()
  const [userContentCount, setUserContentCount] = useState<number | undefined>(undefined)
  const [userLikesCount, setUserLikesCount] = useState<number | undefined>(undefined)
  const userTags = ((profile?.tags) != null) || []
  useEffect(() => {
    if (profile != null) {
      getUserTotalContentCount(profile.uid).then(setUserContentCount)
      getUserTotalLikesCount(profile.uid).then(setUserLikesCount)
    }
  }, [profile])

  if (isLoading) {
    return (
      <Card bordered={false} className={styles.card} loading>
        <div className={styles.avatarHolder}>
          <Avatar size={150} />
        </div>
      </Card>
    )
  }

  return (
    <Card bordered={false} className={styles.card}>
      <div className={styles.avatarHolder}>
        <FirebaseImage type={ImageType.USER} id={(profile != null) ? profile.uid : ''} size={150} />
      </div>

      <div className={styles.content}>
        <Row>
          <Col xs={24} lg={isCurrentUser ? 16 : 24}>
            <h4 className={styles.name}>{(profile != null) ? profile.name : ''}</h4>
            {isCurrentUser && (
              <div>
                <p>
                  <i />
                  {(currentUser != null) ? currentUser.email : ''}
                </p>
              </div>
            )}

            <Divider className={styles.divider} dashed />

            <UserTags userTags={userTags} />

            <Divider className={styles.divider} dashed />

            <div className={styles.infos}>
              <div className={styles.infoGroup}>
                <span className={styles.value}>
                  {userContentCount !== undefined ? userContentCount : ''}
                </span>
                <span className={styles.label}>
                  <FormattedMessage id='user.posts' defaultMessage='Posts' />
                </span>
              </div>
              <div className={styles.infoGroup}>
                <span className={styles.value}>
                  {userLikesCount !== undefined ? userLikesCount : ''}
                </span>
                <span className={styles.label}>
                  <FormattedMessage id='user.likes' defaultMessage='Likes' />
                </span>
              </div>
            </div>
          </Col>
          {isCurrentUser && (
            <Col xs={24} lg={8} className={styles.buttons}>
              <Button
                type='default'
                shape='round'
                size='small'
                block
                onClick={() => useRouter().push(getUserWizard())}
              >
                <EditOutlined />
                <FormattedMessage id='user.actions.editProfile' defaultMessage='Edit profile' />
              </Button>

              {isUserPro() && ( // TODO: cluch together isCurrentUser with currentUser, don't make them separate
                <Button
                  type='default'
                  shape='round'
                  size='small'
                  block
                  target='_blank'
                  href={getCancelSubscriptionUrl()}
                >
                  <FormattedMessage
                    id='user.actions.cancelSubscription'
                    defaultMessage='Cancel subscription'
                  />
                </Button>
              )}
              {!isUserPro() && ( // TODO: cluch together isCurrentUser with currentUser, don't make them separate
                <Button
                  type='default'
                  shape='round'
                  size='small'
                  block
                  onClick={() => useRouter().push(getPaymentUrl())}
                >
                  Unlock Pro
                </Button>
              )}
            </Col>
          )}
        </Row>
      </div>
    </Card>
  )
}

export default UserCard
