import { gql } from "@apollo/client";

export const GET_LATEST_PRODUCT = gql`
  query getProductsAndVariants {
    products(first: 10) {
      edges {
        cursor
        node {
          id
          title
          handle
          featuredImage{
            id
            url
          }
          priceRange{
            minVariantPrice{
              amount
              currencyCode
            }
            maxVariantPrice{
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;