import {gql} from '@apollo/client';

export const GET_COLLECTION = gql`
  query getCollections {
    collections(first: 100) {
      edges {
        node {
          id
          title
          image {
            url
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS_IN_COLLECTION = gql`
  query getProductsInCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      products(first: 50, sortKey: BEST_SELLING) {
        edges {
          node {
            id
            variants(first: 1) {
              nodes {
                id
              }
            }
            title
            vendor
            availableForSale
            images(first: 1) {
              edges {
                node {
                  id
                  url
                  width
                  height
                  altText
                }
              }
            }
            priceRange {
              # Returns range of prices for a product in the shop's currency.
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;
