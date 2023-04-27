import { getStripePayments } from '../firestore-stripe-payments/init';
import { app } from './firebase';

export const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});