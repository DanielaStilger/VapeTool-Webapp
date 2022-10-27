import React, { useEffect } from 'react';
import { Actions } from './ItemView';
import UserCard from './UserCard';
import { Photo, ItemName } from '../../types';
import { observePhoto } from '../../services/items';

export default function PhotoView({
  uid,
  item,
}: {
  uid: string;
  item: Photo;
}) {
  // TODO: consider removing observer on photo
  const [photo, setPhoto] = React.useState<Photo | undefined>(item);

  useEffect(() => { observePhoto(uid, setPhoto) }, [uid]);

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