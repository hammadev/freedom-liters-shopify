import { gql } from '@apollo/client';

export const GET_COLLECTION = gql`
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