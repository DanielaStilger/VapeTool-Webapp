import React from 'react';
import { Card, Col, InputNumber, Row } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { SwapOutlined } from '@ant-design/icons';
import styles from './converters.less';
import { useAwgMmModel } from '@/models/awgMm';

const AwgConverter: React.FC = () => {
  const { awg, setAwg, mm, setMm } = useAwgMmModel();

  const onChangeAwg = setAwg;
  const onChangeMm = setMm;

  return (
    <Card title={<FormattedMessage id="converters.titles.awgToMm" defaultMessage="AWG to mm" />}>
      <Row justify="space-between">
        <Col xs={10} lg={24} xl={10} style={{ textAlign: 'center' }}>
          <label>
            <FormattedMessage id="misc.units.awg" defaultMessage="AWG" />
            <InputNumber
              size="large"
              type="number"
              min={0}
              max={100}
              value={awg}
              precision={0}
              onChange={value => onChangeAwg(Number(value))}
              placeholder={useIntl().formatMessage({ id: 'misc.units.awg', defaultMessage: 'AWG' })}
              className={styles.input}
            />
          </label>
        </Col>

        <Col xs={4} lg={24} xl={4} style={{ textAlign: 'center' }}>
          <SwapOutlined className={styles.swapSign} />
        </Col>

        <Col xs={10} lg={24} xl={10} style={{ textAlign: 'center' }}>
          <label>
            [
            <FormattedMessage id="misc.units.mm" defaultMessage="mm" />
            ]
            <InputNumber
              size="large"
              type="number"
              min={0}
              max={100000}
              step={0.01}
              value={mm}
              precision={3}
              onChange={value => onChangeMm(Number(value))}
              placeholder={useIntl().formatMessage({ id: 'misc.units.mm', defaultMessage: 'mm' })}
              className={styles.input}
            />
          </label>
        </Col>
      </Row>
    </Card>
  );
};

export default AwgConverter;
