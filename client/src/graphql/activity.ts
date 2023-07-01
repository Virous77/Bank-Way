import { gql } from "@apollo/client";

export const CREATE_ACTIVITY = gql`
  mutation CreateActivity($input: CreateActivityInput!) {
    createActivity(input: $input) {
      data {
        type
      }
      message
      status
    }
  }
`;

export const GET_ALL_ACTIVITY = gql`
  query GetAllActivity($input: ActivityAllType!) {
    getAllActivity(input: $input) {
      data {
        id
        name
        type
        type_name
        amount
        date
        is_edited
        note
        createdAt
      }
      message
      status
    }
  }
`;
