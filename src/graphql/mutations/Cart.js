import {gql} from '@apollo/client';

export const Create_Cart = gql`
input CartInput {
    attributes
    buyerIdentity
    discountCodes
    lines
    metafields
    note
}
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($productId: ID!) {
    addToCart(productId: $productId) {
      id
      items {
        id
        name
        price
      }
    }
  }
`;

//  input CartInput {
//     attributes: [AttributeInput!]
//     buyerIdentity: CartBuyerIdentityInput
//     discountCodes: [String!]
//     lines: [CartLineInput!]
//     metafields: [CartInputMetafieldInput!]
//     note: String
//     }
