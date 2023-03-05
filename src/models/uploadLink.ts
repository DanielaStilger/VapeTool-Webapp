import { User as DatabaseUser } from '@vapetool/types'
import { useState } from 'react';
import { message } from 'antd';
import { createLink } from '@/services/items';
import { Author } from '@vapetool/types';
import useRouter from '@/utils/useRouter';

export const useUploadLinkModel = () => {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const reset = () => {
    setUrl('');
    setText('');
  };
  const submitLink = async (user: DatabaseUser) => {
    const author: Author = {
      uid: user.uid,
      displayName: user.display_name,
    };
    if (!url.startsWith('http')) {
      setUrl(`https://${url}`);
    }
    try {
      createLink(text, url, author);
      message.success('Sucessfully published link');
      reset();
      useRouter().replace('/cloud')
    } catch (e) {
      if (e instanceof Error){
        message.error(e.message);
      }
    }
  };
  return {
    url,
    setUrl,
    text,
    setText,
    submitLink,
  };
}
