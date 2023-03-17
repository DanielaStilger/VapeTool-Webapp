import React, { useCallback } from 'react'
import { LogoutOutlined, UserOutlined, UnlockOutlined } from '@ant-design/icons'
import { Dropdown, Menu, message, Spin } from 'antd'
import { FormattedMessage } from 'react-intl'
import { ImageType } from '@/services/storage'
import { getPaymentUrl, getUserProfileUrl } from '@/places/user.places'
import { logoutFirebase } from '@/services/user'
import useStyles from './style'
import FirebaseImage from '../StorageAvatar'
import useRouter from '@/utils/useRouter'
import { useAuth } from '@/context/FirebaseAuthContext'

const AvatarDropdown: React.FC = () => {
  const { styles } = useStyles()
  const router = useRouter()
  const { firebaseUser, dbUser } = useAuth()

  const loading = (
    <span className={`${styles.action}`}>
      <Spin
        size='small'
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      />
    </span>
  )

  const onMenuClick = useCallback(async (event: any) => {
    const { key } = event
    if (key === 'logout') {
      logoutFirebase()
      return
    }
    if (key === 'profile') {
      if (!firebaseUser?.uid) {
        message.error("Couldn't retreive current user")
        return
      }
      router.push(getUserProfileUrl(firebaseUser.uid))
      return
    }
    if (key === 'unlockPro') {
      router.replace(getPaymentUrl())
    }
  }, [])

  if (!dbUser || !dbUser?.display_name) {
    return loading
  }
  // TODO show unlockPro only when !isPro(currentUser) is false
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {dbUser && (
        <Menu.Item key='profile'>
          <UserOutlined />
          <FormattedMessage id='menu.account.center' defaultMessage='account center' />
        </Menu.Item>
      )}
      {dbUser && (
        <Menu.Item key='unlockPro'>
          <UnlockOutlined />
          <FormattedMessage id='menu.account.unlock-pro' defaultMessage='unlock pro' />
        </Menu.Item>
      )}
      {dbUser && <Menu.Divider />}
      <Menu.Item key='logout'>
        <LogoutOutlined />
        <FormattedMessage id='menu.account.logout' defaultMessage='logout' />
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown>
      <span className={`${styles.action}`}>
        <FirebaseImage
          size='small'
          type={ImageType.USER}
          id={dbUser.uid}
          className={styles.avatar}
          alt='avatar'
        />
        <span className={`${styles.name} anticon`}>{dbUser.display_name}</span>
      </span>
    </Dropdown>
  )
}

export default AvatarDropdown
