import React, { useEffect, useState } from 'react'
import { Card, Col, Radio, Row, Spin, Tag, Typography } from 'antd'
import { Badge, Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { RadioChangeEvent } from 'antd/lib/radio'
import { CheckCircleFilled } from '@ant-design/icons'
import useStyles from './style'
import toast from "react-hot-toast";
import { getProducts } from '@/firestore-stripe-payments/product'
import { SessionCreateParams, createCheckoutSession } from '@/firestore-stripe-payments/session'
import type { Price, Product } from '@/firestore-stripe-payments/product'
import { currentCustomerPortalLink, payments } from "@/utils/stripe"
import { useAuth } from '@/context/FirebaseAuthContext';

export enum SubscriptionPlan {
  MONTHLY = 'MONTHLY',
  ANNUALLY = 'ANNUALLY',
  LIFETIME = 'LIFETIME',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stripeCodes = {
  // first PRODUCTION, second DEVELOPMENT
  [SubscriptionPlan.MONTHLY]: ['plan_Ha1E7UzNidhC9Q', 'plan_GzHJlYB6AmQMJu'],
  [SubscriptionPlan.ANNUALLY]: ['plan_Ha1E0tVa0Be7Zx', 'plan_GzHrBem88w5v0n'],
  [SubscriptionPlan.LIFETIME]: ['sku_Ha1EpVv51gdqrb', 'price_1Hmm69BXl6CSFDJe9ghbla4c']
}
const Payment: React.FC = () => {
  const [type, setType] = useState(SubscriptionPlan.ANNUALLY)
  const [step, setStep] = useState(0)
  const [processingPayment, setProcessingPayment] = useState(false)
  const { styles } = useStyles()
  const { dbUser, isUserPro, getStripeSubscription, isLifetimePro } = useAuth()
  const isPro = isUserPro()
  const isLifetime = isLifetimePro()
  const stripeSubscription = getStripeSubscription()
  const [yearlyPrice, setYearlyPrice] = useState<Price>();
  const [monthlyPrice, setMonthlyPrice] = useState<Price>();
  const [lifeTimePrice, setLifeTimePrice] = useState<Price>();

  useEffect(() => {
    getProducts(payments, {
      includePrices: true,
      activeOnly: true,
    }).then((products) => {
      const vapeToolProProd = products.find((prod) => prod.name == "Vape Tool Pro")
      if (!vapeToolProProd) { return }
      for (const price of vapeToolProProd.prices) {
        if (!price.interval) { //lifetime
          setLifeTimePrice(price)
        }
        if (price.interval == "year") {
          setYearlyPrice(price)
        }
        if (price.interval == "month") {
          setMonthlyPrice(price)
        }
      }
    });
  }, [])

  const processPayment = async () => {
    try {
      setStep(1);
      let price: Price | undefined = undefined;
      let params: SessionCreateParams | undefined = undefined
      switch (type) {
        case SubscriptionPlan.MONTHLY: {
          if (!monthlyPrice) {
            toast.error("Monthly subscription is not available at the moment. Please try again later.")
            console.error("Monthly payment is not available at the moment. Please try again later.")
            return;
          } else {
            params = { price: monthlyPrice.id, mode: "subscription" }
          }
          break;
        }
        case SubscriptionPlan.ANNUALLY: {
          if (!yearlyPrice) {
            toast.error("Annually subscription is not available at the moment. Please try again later.")
            console.error("Annually payment is not available at the moment. Please try again later.")
            return;
          } else {
            params = { price: yearlyPrice.id, mode: "subscription" }
          }
          break;
        }
        case SubscriptionPlan.LIFETIME: {
          if (!lifeTimePrice) {
            toast.error("Lifetime payment is not available at the moment. Please try again later.")
            console.error("Lifetime payment is not available at the moment. Please try again later.")
            return;
          } else {
            params = { price: lifeTimePrice.id, mode: "payment" }
          }
          break;
        }
        default: {
          toast.error("Please select a price.")
          console.error("Please select a price.")
          return;
        }
      }
      console.log({ params })

      if (!params) {
        return;
      }

      const session = await createCheckoutSession(payments, params);
      // or open portal where user can chose what to subscribe to
      // if life-time payment then create checkout.
      window.location.assign(session.url);
    } catch (e) {
      console.error({ e })
      setStep(0);
    }
  }

  const manageSubscription = async () => {
    try {
      const url = currentCustomerPortalLink(dbUser?.email)
      window.open(url, "_blank")
    } catch (e) {
      console.error({ e })
      setStep(0);
    }
  }

  const onChange = (e: RadioChangeEvent) => setType(e?.target?.value || SubscriptionPlan.ANNUALLY)

  return (
    <Row gutter={[16, 16]} justify='center'>
      <Col xs={24} md={12} style={{ maxWidth: 505 }}>
        <Card className={styles.benefitsCard} style={{ minHeight: 500 }}>
          <Typography.Title>Vape Tool Pro Benefits</Typography.Title>
          <ul>
            <li>Access to <b>15</b> coil types calculator</li>
            <li>Sweet Spot Finder</li>
            <li>Advanced Coil specs</li>
            <li>Batteries charts</li>
            <li>Min battery resistance</li>
            <li>Wires length</li>
            <li>Visualize coils</li>
            <li>Ad-free</li>
            <li>Support project development</li>
          </ul>
        </Card>
      </Col>

      <Col xs={24} md={12} style={{ maxWidth: 505 }}>
        {isPro ? <Card>
          {stripeSubscription && !isLifetime ? <div className="flex mt-4 space-x-3 md:mt-6 h-fit items-center gap-1 font-semibold">
            You are already a pro user {`until ${stripeSubscription.until.toString()}`}
            {stripeSubscription?.cancelAtEndPeriod ? <Badge color="warning">Cancelled</Badge> : <Badge color="success">Active</Badge>}
          </div> : ""}
          {isLifetime ? <Typography.Text>You are already a pro user</Typography.Text> : ""}
          <Button onClick={manageSubscription}>Manage payments</Button>
        </Card> :
          SubscriptionView(styles, onChange, type, monthlyPrice, yearlyPrice, lifeTimePrice, processPayment, step, processingPayment)
        }
      </Col>

    </Row>
  )
}

function SubscriptionView(styles: { active: string; benefitsCard: string; paymentOption: string; radioText: string; paymentCard: string; accepted: string; return: string; methodName: string; paypalMethod: string; poweredBy: string; '& > img': string; paypalLogo: string; paymentMethod: string; }, onChange: (e: RadioChangeEvent) => void, type: SubscriptionPlan, monthlyPrice: Price | undefined, yearlyPrice: Price | undefined, lifeTimePrice: Price | undefined, processPayment: () => Promise<void>, step: number, processingPayment: boolean) {
  return <Card className={styles.paymentCard} style={{ minHeight: 500 }}>
    <Typography.Title>Vape Tool Pro</Typography.Title>
    <Typography.Title level={4}>Choose you plan:</Typography.Title>


    <Radio.Group onChange={onChange} value={type}>
      <Radio
        value={SubscriptionPlan.MONTHLY}
        className={`${styles.paymentOption} ${type === SubscriptionPlan.MONTHLY ? styles.active : ''}`}
      >

        <div className={styles.radioText}>
          <Tag color='blue'>Just trying out</Tag>
          <div>Monthly @ ${(monthlyPrice?.unit_amount || 0) / 100}</div>
        </div>
      </Radio>
      <Radio
        value={SubscriptionPlan.ANNUALLY}
        className={`${styles.paymentOption} ${type === SubscriptionPlan.ANNUALLY ? styles.active : ''}`}
      >
        <div className={styles.radioText}>
          <Tag color='green'>I&apos;m in</Tag>
          <div>Annually @ ${(yearlyPrice?.unit_amount || 0) / 100}</div>
        </div>
      </Radio>
      <Radio
        value={SubscriptionPlan.LIFETIME}
        className={`${styles.paymentOption} ${type === SubscriptionPlan.LIFETIME ? styles.active : ''}`}
      >
        <div className={styles.radioText}>
          <Tag color='red'>
            I{' '}
            <span role='img' aria-label='love'>
              love{' '}
            </span>{' '}
            it ❤️
          </Tag>
          <div>Lifetime @ ${(lifeTimePrice?.unit_amount || 0) / 100}</div>
        </div>
      </Radio>
    </Radio.Group>
    <Button onClick={processPayment} disabled={step > 0}>
      <p>
        Continue
      </p>
      <HiOutlineArrowRight className="ml-2 h-5 w-5" />

    </Button>

    {processingPayment && (
      <div style={{ textAlign: 'center' }}>
        <Spin size='large' style={{ marginLeft: 8, marginRight: 8 }} />
      </div>
    )}
    <Typography.Paragraph className={styles.return} strong>
      <CheckCircleFilled style={{ marginRight: 4 }} />
      Your purchase is fully refundable within 14 days.
    </Typography.Paragraph>
  </Card>;
}

export default Payment;