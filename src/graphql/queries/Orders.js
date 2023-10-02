import {gql} from '@apollo/client';

export const GET_ORDERS = gql`
  query getOrders {
    orders(first: 10) {
      edges {
        node {
          id
          totalPriceV2 {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;


export const Checkout = gql`
 query checkoutCreate(
      input: {
        lineItems: {
          quantity: 10
          variantId: "gid://shopify/ProductVariant/40775278166203"
        }
      }
    ) {
      checkoutUserErrors {
        code
        message
      }
    }
  
`;