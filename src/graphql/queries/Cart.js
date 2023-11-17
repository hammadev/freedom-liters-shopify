import {gql} from '@apollo/client';

export const GET_CART = gql`
  query cartQuery($cartId: ID!) {
    cart(id: $cartId) {
      id
      createdAt
      updatedAt
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            cost {
              totalAmount {
                amount
              }
              amountPerQuantity {
                amount
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                product {
                  tags
                  title
                }
                image {
                  url
                }
              }
            }

            attributes {
              key
              value
            }
          }
        }
      }
      attributes {
        key
        value
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
      buyerIdentity {
        email
        phone
        customer {
          id
        }
        countryCode
      }
    }
  }
`;
