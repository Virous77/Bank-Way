import { gql } from "@apollo/client";

export const CREATE_ACTIVITY = gql`
  mutation CreateActivity($input: CreateActivityInput!) {
    createActivity(input: $input) {
      data {
        id
        name
        type
        type_name
        amount
        is_edited
        date
        createdAt
      }
      message
      status
    }
  }
`;
