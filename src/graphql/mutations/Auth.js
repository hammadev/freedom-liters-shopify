import { gql } from '@apollo/client';


export const CREATE_CUSTOMER_ACCOUNT = gql`
mutation createCustomerAccount($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
        phone
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;


export const CREATE_CUSTOMER_ACCESS_TOKEN = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_UPDATE = gql`
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation SendPasswordResetEmail($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
      userErrors {
        message
      }
    }
  }
`;