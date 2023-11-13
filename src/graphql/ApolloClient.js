import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';

// Load the access token as per your instructions
const storefrontAccessToken = 'bd2caaa540b72d513b488db6e9235c78';
const api_version = '2023-01';
const shop = 'irongearclothing.myshopify.com';
// Shopify Storefront API URL
const apiBaseUrl = `https://${shop}/api/${api_version}/graphql.json`;

// Create an HTTP link
const httpLink = createHttpLink({
  uri: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
  },
});

// Create the Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

// const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

// const createPaymentIntent = async (amount, currency, customerEmail) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: currency,
//       description: 'Shopify Order Payment',
//       receipt_email: customerEmail,
//     });

//     return paymentIntent.client_secret;
//   } catch (error) {
//     console.error(error);
//   }
// };
