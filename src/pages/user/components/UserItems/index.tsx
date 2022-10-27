import { List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PhotoView, PostView } from '../../../../components/ItemView';
import { Item, Photo, Post } from '../../../../types';

interface UserItemProps<T extends Item> {
  userId: string;
  subscribe: (onChange: (newItems: T[]) => void, userId: string) => () => void;
}

export default function UserItems<T extends Item>({
  userId,
  subscribe,
}: UserItemProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  useEffect(() => {
    return subscribe(setItems, userId);
  }, []);

  return (

            <List sx={{ width: '100%', maxWidth: 614, bgcolor: 'background.paper' }} >

                {items.map((item) => {
                    if (item.$type === 'photo') {
                        return <PhotoView uid={item.uid} key={item.uid}  item={item as Photo} />;
                    }
                    if (item.$type === 'post') {
                        return <PostView key={item.uid} item={item as Post} />;
                    }
                    // if (item.$type === 'link') {
                    //     return <LinkView key={item.uid} displayCommentsLength={3} item={item as Link} />;
                    // }
                    return <div key={item.uid} />;

                })}
                </List>
  );
}
