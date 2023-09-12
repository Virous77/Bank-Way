import { gql } from "@apollo/client";

export const CREATE_TRANSFER = gql`
  mutation CreateTransfer($input: CreateTransferInput!) {
    createTransfer(input: $input) {
      data {
        _id
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
        _id
        transfer_to
        amount
        notes
        createdAt
        isCompleted
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
        _id
      }
      message
      status
    }
  }
`;

export const UPDATE_TRANSFER = gql`
  mutation UpdateTransfer($input: UpdateTransferInput!) {
    updateTransfer(input: $input) {
      data {
        _id
      }
      message
      status
    }
  }
`;
