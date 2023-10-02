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
