import { gql } from "@apollo/client";

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




//  input CartInput {
//     attributes: [AttributeInput!]
//     buyerIdentity: CartBuyerIdentityInput
//     discountCodes: [String!]
//     lines: [CartLineInput!]
//     metafields: [CartInputMetafieldInput!]
//     note: String
//     }