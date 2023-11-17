import {gql} from '@apollo/client';

// export const Create_Cart = gql`
// input CartInput {
//     attributes
//     buyerIdentity
//     discountCodes
//     lines
//     metafields
//     note
// }
// `;

// export const ADD_TO_CART_MUTATION = gql`
//   mutation AddToCart($productId: ID!) {
//     addToCart(productId: $productId) {
//       id
//       items {
//         id
//         name
//         price
//       }
//     }
//   }
// `;

//  input CartInput {
//     attributes: [AttributeInput!]
//     buyerIdentity: CartBuyerIdentityInput
//     discountCodes: [String!]
//     lines: [CartLineInput!]
//     metafields: [CartInputMetafieldInput!]
//     note: String
//     }

// export const ADD_TO_CART = gql`
// mutation AddProductToCart($productId: ID!) {
//   addProductToCart(productId: $productId) {
//     success
//     message
//     // other fields you may need
//   }
// }
// `;

export const GENERATE_CART_ID = gql`
  mutation {
    cartCreate {
      cart {
        id
      }
    }
  }
`;

//////  CREATE CART LINE ITEM WITH ONE PRODUCT  /////

export const CREATE_CART_ADD_ONE_ITEM = gql`
  mutation createCart($cartInput: CartInput) {
    cartCreate(input: $cartInput) {
      cart {
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
                }
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
      }
    }
  }
`;

export const ADD_MORE_ITEM = gql`
  mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
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
      }
      userErrors {
        field
        message
      }
    }
  }
`;
