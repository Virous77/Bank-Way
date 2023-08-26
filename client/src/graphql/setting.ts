import { gql } from "@apollo/client";

export const UPDATE_SETTING = gql`
  mutation UpdateSetting($input: UpdateSettingInput!) {
    updateSetting(input: $input) {
      data {
        _id
      }
      message
      status
    }
  }
`;

export const GET_SETTING = gql`
  query GetUserSetting($id: ID!) {
    getUserSetting(id: $id) {
      data {
        _id
        user_id
        transaction_icon_type
        home_transaction_duration
        home_transaction_type
        createdAt
        updatedAt
      }
      message
      status
    }
  }
`;
