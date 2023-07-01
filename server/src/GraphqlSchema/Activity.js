import { buildSchema } from "graphql";

export const ActivitySchema = buildSchema(`
type Activity {
    id: ID!
    name: String
    type: String!
    type_name: String!
    amount: Int!
    date: String!
    is_edited: Boolean
    note: String
    createdAt: String
    updatedAt: String
  }

  input CreateActivityInput {
     name: String
    type: String!
    type_name: String!
    amount: Int!
    date: String!
    note: String
  }

  input UpdateUserInput {
    id: ID!
   name: String
    type: String!
    type_name: String!
    amount: Int!
    date: String!
    note: String
    is_edited: Boolean
  }

   type Result{
    data: Activity
    message: String
    status: Int
  }


  type Query {
    getActivity(id: ID!): Result
    getAllActivity: [Activity]
  }

  type Mutation {
    createActivity(input: CreateActivityInput!): Result
    updateActivity(input: UpdateUserInput!): Result
    deleteActivity(id: ID!): Result
  }
`);
