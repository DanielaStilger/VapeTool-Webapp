import { message } from 'antd'
import { Author } from '@vapetool/types'
import { createPost } from '@/services/items'
import { useState } from 'react'
import useRouter from '@/utils/useRouter'
import { useAuth } from '@/context/FirebaseAuthContext'

export const useUploadPostModel = () => {
  const auth = useAuth()
  const [title, setTitle] = useState<string>('')
  const [text, setText] = useState<string>('')

  const reset = () => {
    setTitle('')
    setText('')
  }

  const submitPost = async () => {
    if (!auth.dbUser) {
      message.error('You must be logged in to create a post')
      return
    }
    const author: Author = {
      uid: auth.dbUser.uid,
      displayName: auth.dbUser.display_name
    }
    try {
      await createPost(title, text, author)
      message.success('Successfully published post')
      reset()
      useRouter().replace('/cloud')
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message)
      }
    }
  }
  return {
    title,
    setTitle,
    text,
    setText,
    submitPost
  }
}
