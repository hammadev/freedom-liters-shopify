import { gql } from "@apollo/client";

export const GET_LATEST_PRODUCT = gql`
query getLatestProducts {
  products(first: 10) {
    edges {
      node {
        id
        title
        featuredImage{
          id
          url
        }
        priceRange{
          minVariantPrice{
            amount
            currencyCode
          }
        }
        totalInventory
        productType
      }
    }
  }
}
`;

export const PRODUCT_DETAIL = gql`
  
`;