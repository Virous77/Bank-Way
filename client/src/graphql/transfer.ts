import { gql } from "@apollo/client";

export const CREATE_TRANSFER = gql`
  mutation CreateTransfer($input: CreateTransferInput!) {
    createTransfer(input: $input) {
      data {
        id
      }
      message
      status
    }
  }
`;
