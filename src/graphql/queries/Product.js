import { gql } from '@apollo/client';

export const GET_LATEST_PRODUCT = gql`
  query getLatestProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          featuredImage {
            id
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          totalInventory
          productType
          descriptionHtml
          tags
          variants(first: 100) {
            edges {
              node {
                id
                title
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                image {
                  id
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;



