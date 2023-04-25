import React from 'react'
import { Button, Result } from 'antd'
import { getPaymentUrl } from '@/places/user.places'
import useRouter from '@/utils/useRouter'

const CancelPayment: React.FC = () => {
  const onBuyAgainClick = () => useRouter().replace(getPaymentUrl())

  return (
    <Result
      status='info'
      title='Your operation has been cancelled'
      extra={[
        <Button type='primary' onClick={onBuyAgainClick}>
          Go back to payment page
        </Button>
      ]}
    />
  )
}

export default CancelPayment
