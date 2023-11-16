import {gql} from '@apollo/client';

export const GET_CATEGORIES = gql`
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
