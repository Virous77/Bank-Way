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

export const UPDATE_ACTIVITY = gql`
  mutation UpdateActivity($input: UpdateActivityInput!) {
    updateActivity(input: $input) {
      data {
        type
      }
      message
      status
    }
  }
`;

export const GET_PAGINATED_ACTIVITY = gql`
  query GetPaginatedActivity($input: PaginatedActivityInput!) {
    getPaginatedActivity(input: $input) {
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
