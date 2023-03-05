import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card, Descriptions, Typography } from 'antd';
import { ItemName, Liquid } from '@/types';
import styles from './styles.less';
import { Actions } from './ItemView';
import { usePreviewModel } from '@/models/preview';

export default function LiquidView({ item }: { item: Liquid }) {
  const { setSelectedItem, unselectItem } = usePreviewModel();
  const onSelectItem = () => setSelectedItem(item);

  return (
    <>
      <Card className={styles.card} hoverable>
        <Card.Meta
          title={
            <span onClick={onSelectItem}>
              <Typography.Text>{item.name}</Typography.Text>
            </span>
          }
          description={
            <span onClick={onSelectItem}>
              <Typography.Text>{item.description}</Typography.Text>
            </span>
          }
        />

        <Descriptions>
          <Descriptions.Item label={<FormattedMessage id="liquid.vg/pg" defaultMessage="VG/PG" />}>
            {100 - item.targetRatio}/{item.targetRatio}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <FormattedMessage
                id="liquid.nicotineStrength"
                defaultMessage="Nicotine strength [mg/ml]"
              />
            }
          >
            {item.targetStrength}mg/ml
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="liquid.amount" defaultMessage="Amount [ml]" />}
          >
            {item.amount}ml
          </Descriptions.Item>
        </Descriptions>
        <Actions
          what={ItemName.LIQUID}
          item={item}
          unselectItem={unselectItem}
        />
      </Card>
    </>
  );
}
