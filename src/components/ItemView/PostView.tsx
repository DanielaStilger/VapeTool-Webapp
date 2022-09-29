import { Typography } from '@mui/material';
import React from 'react';
import { ItemName, Post } from '../../types';
import { Actions } from './ItemView';
import UserCard from './UserCard';

export default function PostView({
  item,
}: {
  item: Post;
}) {

  return (

    <article
      style={{ marginBottom: 30 }}
    >
      {/* Feed Post Header */}
      <div >
        <UserCard author={item.author} />
      </div>
      {/* Feed Post Image */}
      <div>
        <Typography variant="h1">
          {item.title}
        </Typography>
        <Typography variant="body1">
          {item.text}
        </Typography>
      </div>
      {/* Feed Post Buttons */}
      <Actions<Post> what={ItemName.POST} item={item} />
    </article>
  );
}
