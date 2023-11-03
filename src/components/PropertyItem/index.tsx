import React, { useState } from 'react'
import { Button, InputNumber, Tag } from 'antd'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import useStyles from './style'
import { useAuth } from '@/context/FirebaseAuthContext'

interface PropertyItemProps {
  property: string
  value: React.ReactNode
  unit: string
  proOnly?: boolean
  editable?: boolean
  onChangeValue?: (newValue?: number | string) => void
}

const PropertyItem = (props: PropertyItemProps) => {
  const { isUserPro } = useAuth()
  const { styles } = useStyles()
  const isPro = isUserPro()
  const { property, value, unit, proOnly, editable, onChangeValue } = props
  const displayProOnlyTag = proOnly && !isPro

  const [editValue, setEditValue] = useState<number | undefined>()
  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    if (editable) {
      if (!isEditing) {
        const number = Number(value)
        setEditValue(Number.isFinite(number) ? number : 0)
        setIsEditing(true)
      }
    }
  }

  const onConfirm = () => {
    setIsEditing(false)

    if (onChangeValue !== undefined) {
      onChangeValue(editValue)
    }
  }

  return (
    <div className={styles.property}>
      <div className={styles.label}>
        <FormattedMessage id={`coilCalculator.properties.${property}`} />:
      </div>
      <div
        className={classNames(styles.value, displayProOnlyTag ? styles.proOnly : '', isEditing ? styles.isEditing : '')}
      >
        {displayProOnlyTag && <Tag color='blue'>Pro only</Tag>}
        {!displayProOnlyTag && value === undefined && (
          <FormattedMessage id='coilCalculator.calculationRequired' />
        )}
        {!displayProOnlyTag && value !== undefined && (
          <>
            {isEditing && (
              <InputNumber
                min={0.0}
                step={0.1}
                precision={2}
                value={editValue}
                onChange={(val) =>
                  (Number.isFinite(val) && setEditValue(Number(val))) ||
                  (val === undefined && setEditValue(val))}
              />
            )}

            {!isEditing && (
              <span
                className={`${styles.number} ${editable ? styles.editable : ''}`}
                onClick={enableEditing}
              >
                {Number(value).toFixed(2)}
              </span>
            )}

            <span className={styles.unit}>[{unit}]</span>

            {isEditing && (
              <Button className={styles.confirmBtn} onClick={onConfirm}>
                Confirm
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PropertyItem
