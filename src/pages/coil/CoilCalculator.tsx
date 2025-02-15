import React, { useState } from 'react'
import { Button, Card, Col, InputNumber, Row, Select, Typography, message } from 'antd'
import { FormattedMessage } from 'react-intl'
import { Coil, Properties, Wire, User as DatabaseUser } from '@vapetool/types'
import { Coil as CoilType } from '@/types'
import ComplexWire from '@/components/ComplexWire'
import PropertyItem from '@/components/PropertyItem'
import { CalculatorOutlined, LockFilled, UnlockOutlined, SaveOutlined } from '@ant-design/icons'
import CoilHelper from '@/components/CoilHelper'
import { saveCoil } from '@/services/items'
import SaveModal from '@/components/SaveModal'
import { sendRequest } from '@/services/coil'
import { Path, useCoilModel } from '@/models/coil'
import Banner from '@/components/Banner'
import useStyles from './style'
import { useAuth } from '@/context/FirebaseAuthContext'

const { Option } = Select
const { Title } = Typography

enum Field {
  SETUP = 'SETUP',
  INNER_DIAMETER = 'INNER_DIAMETER',
  LEGS_LENGTH = 'LEGS_LENGTH',
  RESISTANCE = 'RESISTANCE',
  WRAPS = 'WRAPS',
  VOLTAGE = 'VOLTAGE',
}

const CoilCalculator: React.FC = () => {
  const { dbUser, toAuthor } = useAuth()
  const { styles } = useStyles()

  const {
    currentCoil,
    properties,
    baseVoltage,
    setCoilType,
    setBaseVoltage,
    setSetup,
    setInnerDiameter,
    setLegsLength,
    setResistance,
    setWraps,
    calculateForResistance,
    calculateForWraps,
    addWire,
    deleteWire,
    setWire
  } = useCoilModel()

  const [lastEdit, setLastEdit] = useState<Field>(Field.WRAPS)
  const [helpModalVisibile, setHelpModalVisible] = useState(false)
  const [saveModalVisible, setSaveModalVisible] = useState(false)
  const [calculateBtnLoading, setCalculateBtnLoading] = useState(false)

  const onValueChanged = (field: Field) => (value: number | null) => {
    if (field === Field.WRAPS || field === Field.RESISTANCE) {
      setLastEdit(field)
    }

    if (value !== undefined && !Number.isNaN(value)) {
      const FIELD_TO_METHOD_MAP = {
        [Field.SETUP]: setSetup,
        [Field.INNER_DIAMETER]: setInnerDiameter,
        [Field.LEGS_LENGTH]: setLegsLength,
        [Field.RESISTANCE]: setResistance,
        [Field.WRAPS]: setWraps,
        [Field.VOLTAGE]: setBaseVoltage
      }
      FIELD_TO_METHOD_MAP[field](Number(value))
    }
  }

  const onSetupChange = onValueChanged(Field.SETUP)
  const onInnerDiameterChange = onValueChanged(Field.INNER_DIAMETER)
  const onLegsLengthChange = onValueChanged(Field.LEGS_LENGTH)
  const onResistanceChange = onValueChanged(Field.RESISTANCE)
  const onWrapsChange = onValueChanged(Field.WRAPS)

  const calculate = (): void => {
    const calculationFn = lastEdit === Field.WRAPS ? calculateForResistance : calculateForWraps
    setCalculateBtnLoading(true)
    calculationFn().finally(() => setCalculateBtnLoading(false))
  }

  const onBaseVoltageChange = (value?: number | string) => {
    onValueChanged(Field.VOLTAGE)(Number(value))
    calculate()
  }

  const handleWireTypeChange = (type: number, path: Path[]): void => setCoilType(type, path)
  const handleAddWire = (path: Path[], wire: Wire) => addWire(wire, path)
  const handleSetWire = (path: Path[], wire: Wire) => setWire(wire, path)
  const handleDeleteWire = (path: Path[]) => deleteWire(path)

  const validateAndSaveCoil = async (name: string, description?: string) => {
    const res = await sendRequest(
      lastEdit === Field.RESISTANCE ? 'calculateForWraps' : 'calculateForResistance',
      currentCoil as CoilType
    )
    if (res instanceof Response && !res.ok) {
      message.error("Couldn't save coil")
      return
    }
    if (dbUser) {
      saveCoil(currentCoil, toAuthor(dbUser), name, description || '')
    } else {
      throw new Error('Can not save with undefined user ')
    }
  }

  // {{descriptionItem('Total width', 'totalWidth', 'mm')}}  //TODO fix it
  // {{descriptionItem('Total height', 'totalHeight', 'mm')}} //TODO fix it
  const coilProperties = (
    <Col xs={24}>
      <PropertyItem property='baseVoltage' value={baseVoltage} unit='V' editable onChangeValue={onBaseVoltageChange} />
      <PropertyItem property='current' value={properties?.current} unit='A' />
      <PropertyItem property='power' value={properties?.power} unit='W' />
      <PropertyItem property='heat' value={properties?.heat} unit='mW/cm²' proOnly />
      <PropertyItem property='surface' value={properties?.surface} unit='cm²' proOnly />
      <PropertyItem property='totalLength' value={properties?.totalLength} unit='mm' proOnly />
    </Col>
  )

  const coilSetup = (
    <Card style={{ height: '100%' }}>
      <SaveModal visible={saveModalVisible} setVisible={setSaveModalVisible} save={validateAndSaveCoil} />
      <Typography.Link onClick={() => setHelpModalVisible(true)}>Need some help?</Typography.Link>
      <Row justify='space-between' align='middle'>
        <FormattedMessage id='coilCalculator.inputs.setup' />
        <Select defaultValue={currentCoil.setup} onChange={onSetupChange}>
          <Option value='1'>Single Coil (1)</Option>
          <Option value='2'>Dual Coil (2)</Option>
          <Option value='3'>Triple Coil (3)</Option>
          <Option value='4'>Quad Coil (4)</Option>
        </Select>
      </Row>

      <Row justify='space-between' align='middle'>
        <FormattedMessage id='coilCalculator.inputs.innerDiameter' />
        <InputNumber
          min={0.0}
          step={0.1}
          precision={1}
          defaultValue={currentCoil.innerDiameter}
          value={currentCoil.innerDiameter}
          onChange={onInnerDiameterChange}
        />
      </Row>

      <Row justify='space-between' align='middle'>
        <FormattedMessage id='coilCalculator.inputs.legsLength' />
        <InputNumber min={0.0} step={1} precision={0} value={currentCoil.legsLength} onChange={onLegsLengthChange} />
      </Row>

      <Row justify='space-between' align='middle'>
        <FormattedMessage id='coilCalculator.inputs.resistance' />
        <Row>
          <span className={styles.lockIcon} onClick={() => setLastEdit(Field.RESISTANCE)}>
            {lastEdit === Field.RESISTANCE ? <LockFilled /> : <UnlockOutlined />}
          </span>
          <InputNumber
            min={0.0}
            step={0.05}
            precision={3}
            value={currentCoil.resistance}
            onChange={onResistanceChange}
          />
        </Row>
      </Row>
      <Row justify='space-between' align='middle'>
        <FormattedMessage id='coilCalculator.inputs.wraps' />
        <Row>
          <span className={styles.lockIcon} onClick={() => setLastEdit(Field.WRAPS)}>
            {lastEdit === Field.WRAPS ? <LockFilled /> : <UnlockOutlined />}
          </span>
          <InputNumber min={0} step={1} precision={0} value={currentCoil.wraps} onChange={onWrapsChange} />
        </Row>
      </Row>

      <Row style={{ marginTop: 20 }}>
        <Button
          type='primary'
          icon={<CalculatorOutlined />}
          size='large'
          onClick={calculate}
          loading={calculateBtnLoading}
        >
          {' '}
          <FormattedMessage id='coilCalculator.inputs.calculate' />
        </Button>{' '}
        <Button icon={<SaveOutlined />} size='large' onClick={() => setSaveModalVisible(true)}>
          {' '}
          <FormattedMessage id='misc.actions.save' defaultMessage='Save' />
        </Button>
      </Row>

      <Col xs={24} style={{ marginTop: 20 }}>
        {coilProperties}
      </Col>
    </Card>
  )

  const coilSchema = (
    <Card title={<Title level={4}>Type</Title>} style={{ height: '100%' }}>
      <ComplexWire
        complexWire={currentCoil}
        path={[]}
        onSetWireType={handleWireTypeChange}
        onSetInnerDiameter={onInnerDiameterChange}
        onAddWire={handleAddWire}
        onSetWire={handleSetWire}
        onDeleteWire={handleDeleteWire}
      />
    </Card>
  )

  return (
    <React.Fragment>
      <Row justify='center' gutter={32}>
        <div style={{ marginBottom: '2%' }}>
          <Banner providerName='coil_calculator_ad_provider' />
        </div>
        <Col xs={24} sm={20} md={20}>
          <CoilHelper helpModalVisible={helpModalVisibile} setHelpModalVisible={setHelpModalVisible} />
          <Row style={{}} justify='center'>
            <Col xs={{ span: 24, order: 2 }} xl={{ span: 8, order: 1 }}>
              {coilSetup}
            </Col>
            <Col xs={{ span: 24, order: 1 }} xl={{ span: 16, order: 2 }}>
              {coilSchema}
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CoilCalculator
