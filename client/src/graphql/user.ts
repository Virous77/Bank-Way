import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      data {
        id
        name
        image
        bio
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
        email
      }
      message
      status
      token
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
      token
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
      token
    }
  }
`;

export const GET_USER = gql`
  query GetUser($input: GetUserRes!) {
    getUser(input: $input) {
      data {
        id
        name
        email
        image
        bio
      }
      message
      status
      token
    }
  }
`;

export const PASSWORD_CHANGE = gql`
  mutation ChangePassword($input: ChangePassword!) {
    changePassword(input: $input) {
      data {
        id
      }
      message
      status
      token
    }
  }
`;

export const FORGET_PASSWORD = gql`
  mutation ForgetPassword($input: ForgetPassword!) {
    forgetPassword(input: $input) {
      message
      status
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPassword!) {
    resetPassword(input: $input) {
      message
      status
    }
  }
`;
