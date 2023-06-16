import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    image: String
    isAdmin: Boolean
    createdAt: String
    updatedAt: String
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    image: String
    isAdmin: Boolean
  }

  input UpdateUserInput {
    id: ID!
    name: String
    email: String
    password: String
    image: String
    isAdmin: Boolean
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
  }

  type Response{
    data: User
    message: String
    status: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): Response
    updateUser(input: UpdateUserInput!): Response
    deleteUser(id: ID!): Response
  }
`);
