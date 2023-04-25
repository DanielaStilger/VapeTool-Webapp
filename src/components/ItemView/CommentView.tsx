import { Button, Dropdown, Menu, Typography } from 'antd'
import * as React from 'react'
import FirebaseImage from '@/components/StorageAvatar'
import { Comment } from '@/types'
import { ImageType } from '@/services/storage'
import { getUserProfileUrl } from '@/places/user.places'
import { FormattedMessage } from 'react-intl'
import { MoreOutlined } from '@ant-design/icons'
import { canRemove } from '@/access'
import { useAuth } from '@/context/FirebaseAuthContext'
import { Link } from 'react-router-dom'

interface CommentViewProps {
  comment: Comment
  onReply: (comment: Comment) => void
  onDelete: (comment: Comment) => void
}

export const CommentView: React.FC<CommentViewProps> = (props) => {
  const {
    comment: { content, author },
    onReply,
    onDelete
  } = props

  const { dbUser } = useAuth()

  const deleteComment = () => onDelete(props.comment)

  const menu = (
    <Menu>
      {canRemove(author.uid, dbUser) && (
        <Menu.Item onClick={deleteComment} key='delete'>
          <FormattedMessage id='misc.actions.delete' defaultMessage='Delete' />
        </Menu.Item>
      )}
      <Menu.Item onClick={() => onReply(props.comment)} key='reply'>
        <FormattedMessage id='user.actions.reply' defaultMessage='Reply' />
      </Menu.Item>
    </Menu>
  )
  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignContent: 'stretch' }}
    >
      <Link to={getUserProfileUrl(author.uid)}>
        <FirebaseImage
          type={ImageType.USER}
          size='small'
          style={{ flexShrink: 0 }}
          id={author.uid}
        />
        <Typography.Text strong style={{ marginLeft: 8, flexShrink: 0 }}>
          {author.displayName}
        </Typography.Text>
      </Link>
      <span style={{ marginLeft: 8, flexGrow: 1, alignSelf: 'flex-start', textAlign: 'start' }}>
        {content}
      </span>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type='link' icon={<MoreOutlined />} />
      </Dropdown>
    </div>
  )
}
