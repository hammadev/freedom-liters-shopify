import {gql} from '@apollo/client';

export const GET_LATEST_PRODUCT = gql`
  query GetLatestProducts {
    products(first: 8, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          variants(first: 1) {
            edges {
              node {
                id
                title
              }
            }
          }
          descriptionHtml
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_LATEST_PRODUCT = gql`
  query GetLatestProducts {
    products(first: 250, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          variants(first: 1) {
            edges {
              node {
                id
                title
              }
            }
          }
          descriptionHtml
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const GET_FEATURED_PRODUCT = gql`
  query FetchFeaturedProduct {
    products(first: 8) {
      edges {
        node {
          id
          title
          variants(first: 1) {
            edges {
              node {
                id
                title
              }
            }
          }
          descriptionHtml
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_FEATURED_PRODUCT = gql`
  query FetchFeaturedProduct {
    products(first: 250) {
      edges {
        node {
          id
          title
          variants(first: 10) {
            edges {
              node {
                id
                title
              }
            }
          }
          descriptionHtml
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const GET_ONSALE_PRODUCT = gql`
  query GetOnSaleProducts {
    products(query: "tag:onsale", first: 6) {
      edges {
        node {
          id
          title
          variants(first: 1) {
            edges {
              node {
                id
                title
              }
            }
          }
          descriptionHtml
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_ONSALE_PRODUCT = gql`
  query GetOnSaleProducts {
    products(query: "tag:onsale", first: 250) {
      edges {
        node {
          id
          title
          variants(first: 1) {
            edges {
              node {
                id
                title
              }
            }
          }
          descriptionHtml
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCT = gql`
  query GetOnSaleProducts {
    products(query: "tag:onsale", first: 10) {
      edges {
        node {
          id
          title
          variants(first: 1) {
            edges {
              node {
                id
                title
              }
            }
          }
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`;
