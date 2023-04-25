import React from 'react'
import { Typography } from 'antd'
import { getUserProfileUrl } from '../../../places/user.places'
import { PageLoading } from '@ant-design/pro-layout'
import useRouter from '../../../utils/useRouter'
import { useAuth } from '../../../context/FirebaseAuthContext'

const Profile: React.FC = () => {
  const auth = useAuth()
  const router = useRouter()
  if (!auth.dbUser) {
    return <Typography.Paragraph>You must be logged in to preview this page</Typography.Paragraph>
  }
  const userProfileUrl = getUserProfileUrl(auth.dbUser.uid)
  router.replace(userProfileUrl)
  return <PageLoading />
}

export default Profile
