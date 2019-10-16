import React from 'react';
import { connect } from 'dva';
import { List } from 'antd';
import { id } from '@vapetool/types';
import { ConnectProps, ConnectState } from '@/models/connect';
import BatteryView from '@/components/BatteryView';
import { Battery } from '@/types/battery';
import BatteryPreviewDrawer from '@/components/BatteryPreviewDrawer';
import styles from '@/pages/account/center/components/UserPhotos/index.less';

interface BatteriesComponentProps extends ConnectProps {
  batteries: Battery[];
}

const Batteries: React.FC<BatteriesComponentProps> = (props: BatteriesComponentProps) => {
  console.log('render batteries');

  const { batteries } = props;
    return (
      <div>
        <List<Battery>
          className={styles.coverCardList}
          grid={{ gutter: 24, xxl: 4, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }}
          dataSource={batteries || []}
          renderItem={battery => <BatteryView key={id(battery)} battery={battery} height={300}/>}
        />
        <BatteryPreviewDrawer/>
      </div>
    );
}

export default connect(({ batteries: { batteries } }: ConnectState) => ({ batteries }))(Batteries);
