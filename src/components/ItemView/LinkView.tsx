import { Card, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import FirebaseImage from '@/components/StorageAvatar';
import { Link as LinkType, ItemName } from '@/types';
import { ImageType } from '@/services/storage';
import { getUserProfileUrl } from '@/places/user.places';
import { Actions } from './ItemView';
import useStyles from './style';
import { usePreviewModel } from '@/models/preview';

export default function LinkView({ item }: { item: LinkType }) {
  const { setSelectedItem, unselectItem } = usePreviewModel();
  const { styles } = useStyles();
  const onSelectItem = () => setSelectedItem(item);

  return (
    <Card className={styles.card} hoverable>
      <Card.Meta
        avatar={
          <Link to={getUserProfileUrl(item.author.uid)}>
            <FirebaseImage type={ImageType.USER} id={item.author.uid} />
          </Link>
        }
        title={
          <span onClick={onSelectItem}>
            <Typography.Text>{item.title}</Typography.Text>
          </span>
        }
        description={
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <Typography.Text>{item.url}</Typography.Text>
          </a>
        }
      />
      <br />
      {/* <Microlink url={item.url} lazy /> */}
      <Actions what={ItemName.LINK} item={item} unselectItem={unselectItem} />
    </Card>
  );
}
