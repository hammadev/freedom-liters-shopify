import {gql} from '@apollo/client';

export const GET_CATEGORIES = gql`
  query getCollections {
    collections(first: 4) {
      edges {
        node {
          title
          image {
            url
          }
        }
      }
    }
  }
`;
export const GET_ALL_CATEGORIES = gql`
  query getCollections {
    collections(first: 100) {
      edges {
        node {
          title
          image {
            url
          }
        }
      }
    }
  }
`;
