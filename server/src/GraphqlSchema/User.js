import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    image: String
    isAdmin: Boolean
    bio: String
    createdAt: String
    updatedAt: String
    
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    image: String
    isAdmin: Boolean
    bio: String
  }

  input UpdateUserInput {
    id: ID!
    name: String
    email: String
    password: String
    image: String
    isAdmin: Boolean
    bio: String
  }

  input LoginUserInput{
    email: String
    password: String
  }

   type Response{
    data: User
    message: String
    status: Int
  }

  type Query {
    getUser(id: ID!): Response
    getAllUsers: [User]
  }

 

  type Mutation {
    createUser(input: CreateUserInput!): Response
    updateUser(input: UpdateUserInput!): Response
    deleteUser(id: ID!): Response
    loginUser(input: LoginUserInput!): Response
  }
`);
