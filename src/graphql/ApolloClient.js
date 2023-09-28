import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

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