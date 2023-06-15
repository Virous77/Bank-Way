import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      data {
        id
        name
        email
        password
        image
      }
      message
      status
    }
  }
`;
