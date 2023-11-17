import {gql} from '@apollo/client';

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

export const GET_FEATURED_PRODUCT = gql`
  query FetchFeaturedProduct {
    products(first: 5) {
      edges {
        node {
          id
          title
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            originalSrc
          }
        }
      }
    }
  }
`;

export const GET_ONSALE_PRODUCT = gql`
  query GetOnSaleProducts {
    products(query: "on_sale:true", first: 10) {
      edges {
        node {
          id
          title
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCT = gql`
  query GetAllProducts {
    products(first: 50, query: "status:active AND published_status:published") {
      nodes {
        id
        title
      }
    }
  }
`;
