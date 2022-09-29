import React from 'react';
import { Actions } from './ItemView';
import UserCard from './UserCard';
import { Photo, ItemName } from '../../types';

export default function PhotoView({
  item,
}: {
  item: Photo;
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
        <img src={item.url} alt="Post media" />
      </div>
      {/* Feed Post Buttons */}
      <Actions<Photo> what={ItemName.PHOTO} item={item} />
    </article>
  );
}