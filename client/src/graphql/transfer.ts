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

export const GET_ALL_TRANSFER = gql`
  query GetTransferAll($id: ID!) {
    getTransferAll(id: $id) {
      data {
        id
        transfer_to
        amount
        notes
        createdAt
      }
      message
      status
    }
  }
`;

export const DELETE_TRANSFER = gql`
  mutation DeleteTransfer($id: ID!) {
    deleteTransfer(id: $id) {
      data {
        id
      }
      message
      status
    }
  }
`;
