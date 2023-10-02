import { gql } from '@apollo/client';

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





export const GET_PRODUCTS_IN_COLLECTION = gql`query getProductsInCollection($id: ID!) {
	collection(id: $id) {
		id
		title
		products(first: 10, sortKey: BEST_SELLING) {
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
}
`;