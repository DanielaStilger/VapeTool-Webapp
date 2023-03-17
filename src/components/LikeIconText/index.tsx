import React from 'react'
import { LikeFilled, LikeOutlined } from '@ant-design/icons'
import useStyles from './style'

export const LikeIconText = ({
  text,
  onClick,
  likedByMe
}: {
  text: string
  onClick: any
  likedByMe?: boolean
}) => {
  const { styles } = useStyles()
  return (
    <span onClick={onClick}>
      {likedByMe
        ? (
          <LikeFilled className={likedByMe ? styles.liked : ''} style={{ marginRight: 8 }} />
          )
        : (
          <LikeOutlined className={likedByMe ? styles.liked : ''} style={{ marginRight: 8 }} />
          )}
      {text}
    </span>
  )
}
