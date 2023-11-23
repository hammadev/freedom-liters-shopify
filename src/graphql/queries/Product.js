import {gql} from '@apollo/client';

export const GET_LATEST_PRODUCT = gql`
  query GetLatestProducts {
    products(first: 8, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          featuredImage {
            url
          }
          images(first: 5) {
            nodes {
              url
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                image {
                  url
                }
                price {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
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
          featuredImage {
            url
          }
          images(first: 5) {
            nodes {
              url
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                image {
                  url
                }
                price {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
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
    products(first: 8, query: "product_type:featured") {
      edges {
        node {
          id
          title
          featuredImage {
            url
          }
          images(first: 5) {
            nodes {
              url
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                image {
                  url
                }
                price {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
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
    products(first: 100, query: "product_type:featured") {
      edges {
        node {
          id
          title
          featuredImage {
            url
          }
          images(first: 5) {
            nodes {
              url
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                image {
                  url
                }
                price {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
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
          featuredImage {
            url
          }
          images(first: 5) {
            nodes {
              url
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                image {
                  url
                }
                price {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
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
          featuredImage {
            url
          }
          images(first: 5) {
            nodes {
              url
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                image {
                  url
                }
                price {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
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
  query GetProducts {
    products(first: 100) {
      edges {
        node {
          id
          title
          descriptionHtml
          featuredImage {
            url
          }
          images(first: 5) {
            nodes {
              url
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                image {
                  url
                }
                price {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
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

export const FILTER_PRODUCTS = gql`
  query getSortProducts($reverse: Boolean!, $sortkey: ProductSortKeys!) {
    products(first: 100, sortKey: $sortkey, reverse: $reverse) {
      edges {
        node {
          id
          title
          descriptionHtml
          images(first: 5) {
            nodes {
              url
            }
          }
          createdAt
          variants(first: 10) {
            edges {
              node {
                id
                title
                image {
                  url
                }
                price {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
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

export const FILTER_CATEGORY_PRODUCTS = gql`
  query getProductsOfProductTypeInCollection($handle: String!, $reverse: Boolean!, $sortkey: ProductCollectionSortKeys!) {
    collection(handle: $handle) {
      handle
      products(first: 100, sortKey: $sortkey, reverse: $reverse) {
        edges {
          node {
            id
            title
            descriptionHtml
            images(first: 10) {
              nodes {
                url
              }
            }
            createdAt
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  image {
                    url
                  }
                  price {
                    amount
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
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
  }
`;
