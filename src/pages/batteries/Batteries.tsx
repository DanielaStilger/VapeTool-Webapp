import React from 'react';
import { List, Row, Col } from 'antd';
import { id } from '@vapetool/types';
import BatteryView from '@/components/BatteryView';
import BatteryPreviewDrawer from '@/components/BatteryPreviewDrawer';
import useStyles from '@/components/ItemView/style';
import { Battery } from '@/types';
import { PageContainer } from '@ant-design/pro-layout';
import Banner from '@/components/Banner';
import { useBatteriesModel } from '@/models/batteries';

const Batteries = () => {
  const { setSelectedBattery, batteries } = useBatteriesModel();
  const { styles } = useStyles();
  const onBatteryClick = (battery: Battery) => setSelectedBattery(battery);

  return (
    <PageContainer>
      <Row justify="center" gutter={32}>
        <div style={{ marginBottom: '2%' }}>
          <Banner providerName="batteries_database_ad_provider" />
        </div>
        <Col xs={24} sm={20} md={16}>
          <List<Battery>
            className={styles.coverCardList}
            grid={{ gutter: 24, xxl: 4, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }}
            dataSource={batteries || []}
            renderItem={(battery) => (
              <BatteryView
                key={id(battery)}
                battery={battery}
                height={300}
                onBatteryClick={onBatteryClick}
              />
            )}
          />
          <BatteryPreviewDrawer />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Batteries;
