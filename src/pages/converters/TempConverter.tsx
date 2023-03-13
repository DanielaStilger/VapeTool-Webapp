import React from 'react';
import { Card, Col, InputNumber, Row } from 'antd';
import { useIntl, FormattedMessage } from 'react-intl';
import { SwapOutlined } from '@ant-design/icons';
import useStyles from './style';
import { useTempModel } from '@/models/temp';

const TempConverter: React.FC = () => {
  const { celsius, setCelsius, fahrenheit, setFahrenheit } = useTempModel();
  const { styles } = useStyles();

  return (
    <Card
      title={
        <FormattedMessage
          id="converters.titles.temp"
          defaultMessage="Convert Celsius to Fahrenheit"
        />
      }
    >
      <Row justify="space-between">
        <Col xs={10} lg={24} xl={10} style={{ textAlign: 'center' }}>
          <label>
            <FormattedMessage id="misc.units.long.celsius" defaultMessage="Celsius [°C]" />
            <InputNumber
              size="large"
              type="number"
              min={-273.15}
              step={0.5}
              value={celsius}
              precision={2}
              onChange={value => setCelsius(Number(value))}
              placeholder={useIntl().formatMessage({
                id: 'misc.units.short.celsius',
                defaultMessage: '[°C]',
              })}
              className={styles.input}
            />
          </label>
        </Col>

        <Col xs={4} lg={24} xl={4} style={{ textAlign: 'center' }}>
          <SwapOutlined className={styles.swapSign} />
        </Col>

        <Col xs={10} lg={24} xl={10} style={{ textAlign: 'center' }}>
          <label>
            <FormattedMessage id="misc.units.long.fahrenheit" defaultMessage="Fahrenheit [°F]" />
            <InputNumber
              size="large"
              type="number"
              step={1}
              value={fahrenheit}
              precision={1}
              onChange={value => setFahrenheit(Number(value))}
              placeholder={useIntl().formatMessage({
                id: 'misc.units.short.fahrenheit',
                defaultMessage: '[°F]',
              })}
              className={styles.input}
            />
          </label>
        </Col>
      </Row>
    </Card>
  );
};

export default TempConverter;
