import { gql } from '@apollo/client';

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