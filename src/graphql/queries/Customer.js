import {gql} from '@apollo/client';

export const FETCH_CUSTOMER_INFO = gql`
  query FetchCustomerInfo($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      email
      firstName
      id
      lastName
      displayName
      phone
      acceptsMarketing
    }
  }
`;

export const FETCH_CUSTOMER_ADDRESS = gql`
  query FetchCustomerAddress($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      defaultAddress {
        id
      }
      addresses(first: 100, reverse: true) {
        edges {
          node {
            id
            firstName
            lastName
            company
            phone
            address1
            address2
            city
            country
            province
            zip
          }
        }
      }
    }
  }
`;

export const GET_CUSTOMER = gql`
  query GetCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
    }
  }
`;
