import {gql} from '@apollo/client';

export const GET_CART = gql`
  # Query a cart by id and return some of the cart's objects. See documentation here for comprehensive list: https://shopify.dev/api/storefront/latest/queries/cart
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

            merchandise {
              ... on ProductVariant {
                id

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
