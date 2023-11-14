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
