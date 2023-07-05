import { getStripePayments } from '../firestore-stripe-payments/init';
import { app } from './firebase';
import { IS_PRODUCTION } from './utils';

export const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

const BASE_URL = "https://billing.stripe.com/p/login"
const TEST_URL = `${BASE_URL}/test_3cs6pZcSL1YqcCsfYY`
const PROD_URL = `${BASE_URL}/bIYcMXbRvcdX70kdQQ`
const CUSTOMER_PORTAL_LINK = IS_PRODUCTION ? PROD_URL : TEST_URL

export const currentCustomerPortalLink = (email: string | undefined) => {
  return email ? `${CUSTOMER_PORTAL_LINK}?prefilled_email=${encodeURIComponent(email)}` : CUSTOMER_PORTAL_LINK;
}