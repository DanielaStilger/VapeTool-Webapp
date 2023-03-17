import React from 'react'
import { Tag } from 'antd'
import { FormattedMessage } from 'react-intl'

import useStyles from './style'

interface UserCardProps {
  userTags: Array<{ key: string, label: string }>
}

const UserTags: React.FC<UserCardProps> = ({ userTags }) => {
  const { styles } = useStyles()
  return (
    <div>
      <span className={styles.tagsTitle}>
        <FormattedMessage id='user.labels' defaultMessage='Labels' />:
      </span>
      {userTags.map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
    </div>
  )
}

export default UserTags
