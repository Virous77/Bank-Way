import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      data {
        id
        name
        image
      }
      message
      status
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      data {
        id
        name
        image
      }
      message
      status
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      data {
        id
      }
      message
      status
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      data {
        id
      }
      message
      status
    }
  }
`;