import React from 'react'
import { Card, Col, InputNumber, Row } from 'antd'
import { useIntl, FormattedMessage } from 'react-intl'
import { LineOutlined, PauseOutlined, SwapOutlined } from '@ant-design/icons'
import useStyles from './style'
import { useInchMmModel } from '@/models/inchMm'

const InchConverter: React.FC = () => {
  const {
    mm,
    setMm,
    inch,
    setInch,
    nominator,
    setNominator,
    denominator,
    setDenominator
  } = useInchMmModel()
  const { styles } = useStyles()

  return (
    <Card
      title={<FormattedMessage id='converters.titles.inchToMm' defaultMessage='Inches to mm' />}
    >
      <Row justify='space-between'>
        <Col xs={10} lg={24} xl={10} style={{ textAlign: 'center' }}>
          <div className={styles.fraction}>
            <InputNumber
              size='large'
              type='number'
              min={1}
              max={10}
              step={1}
              precision={0}
              value={nominator}
              onChange={value => setNominator(Number(value))}
              className={styles.nominator}
            />

            <LineOutlined className={styles.line} />

            <InputNumber
              size='large'
              type='number'
              min={1}
              max={100}
              step={1}
              precision={0}
              value={denominator}
              onChange={value => setDenominator(Number(value))}
              className={styles.denominator}
            />
          </div>
        </Col>

        <Col xs={4} lg={24} xl={4} style={{ textAlign: 'center' }}>
          <PauseOutlined className={styles.equalSign} />
        </Col>

        <Col xs={10} lg={24} xl={10} className={styles.inchesInput} style={{ textAlign: 'center' }}>
          <label>
            [
            <FormattedMessage id='misc.units.inch' defaultMessage='inch' />
            ]
            <InputNumber
              size='large'
              type='number'
              min={0}
              max={100000}
              step={0.01}
              value={inch}
              precision={4}
              onChange={value => setInch(Number(value))}
              placeholder={useIntl().formatMessage({
                id: 'misc.units.inch',
                defaultMessage: 'inch'
              })}
              className={styles.input}
            />
          </label>
        </Col>

        <Col xs={24} style={{ textAlign: 'center', paddingTop: 40 }}>
          <SwapOutlined style={{ fontSize: 40, transform: 'rotate(90deg)' }} />
        </Col>

        <Col xs={24} style={{ textAlign: 'center', paddingTop: 40 }}>
          <label>
            [
            <FormattedMessage id='misc.units.mm' defaultMessage='mm' />
            ]
            <InputNumber
              size='large'
              type='number'
              min={0}
              max={100000}
              step={0.01}
              value={mm}
              precision={3}
              onChange={value => setMm(Number(value))}
              placeholder={useIntl().formatMessage({ id: 'misc.units.mm', defaultMessage: 'mm' })}
              className={styles.input}
            />
          </label>
        </Col>
      </Row>
    </Card>
  )
}

export default InchConverter
