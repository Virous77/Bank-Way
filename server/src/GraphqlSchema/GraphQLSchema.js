import { buildSchema } from "graphql";

export const GraphQLSchema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    image: String
    isAdmin: Boolean
    bio: String
    otp: Int
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

  input ChangePassword{
     id: ID!
    password: String!
    newPassword: String!
  }

  input ForgetPassword{
  email: String!     
  }

  input LoginUserInput{
    email: String
    password: String
  }

   type UserResponse{
    data: User
    message: String
    status: Int
  }

  type ForgetPassResponse{
    message: String
    status: Boolean
  }

  input ResetPassword{
    otp: Int
    password: String
    confirmPassword: String
  }


type Activity {
    _id: String!
    name: String
    type: String!
    type_name: String!
    amount: Int!
    user_id: String
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
    user_id: String!
  }

  input UpdateActivityInput {
    _id: String!
    name: String
    type: String!
    type_name: String!
    amount: Int!
    date: String!
    note: String
    is_edited: Boolean
    user_id: String!
  }

   type ActivityResult{
    data: Activity
    message: String
    status: Int
  }

  type ActivityResultAll{
    data: [Activity]
     message: String
    status: Int
  }

    type ActivityPaginatedResult{
    data: [Activity]
    message: String
    status: Int
    total: Int
  }

  input ActivityAllType{
    id: String!
    date: String
    type: String
  }

  input PaginatedActivityInput{
    pageNumber: Int
    pageSize: Int
    type: String
    search: String
    user_id: String
  }

  input FilterActivityInput{
    type: String
  }


  type Settings{
    _id: String!
    transaction_icon_type: Boolean
    home_transaction_duration: String
    home_transaction_type: String
    user_id: String
    createdAt: String
    updatedAt: String
  }

  input UpdateSettingInput{
    _id: String
    transaction_icon_type: Boolean
    home_transaction_duration: String
    home_transaction_type: String
    user_id: String!
  }

  type settingResult{
     data: Settings
     message: String
    status: Int
  }

  type Transfer{
    _id: String!
    transfer_to: String
    amount: Int
    notes: String
    user_id: String
    createdAt: String
    updatedAt: String
    isCompleted : Boolean

  }

   input CreateTransferInput {
    transfer_to: String!
    amount: Int!
    notes: String
    user_id: String!
  }

  input UpdateTransferInput {
    id: String!
    isCompleted: Boolean
  }

   type TransferResult{
    data: Transfer
    message: String
    status: Int
   }

   type TransferResultAll{
    data: [Transfer]
    message: String
    status: Int
   }


    type Query {
    getActivity(id: ID!): ActivityResult
    getAllActivity(input: ActivityAllType!): ActivityResultAll
    getUser(id: ID!): UserResponse
    getAllUsers: [User]
    getUserSetting(id: ID!): settingResult
    getPaginatedActivity(input: PaginatedActivityInput) : ActivityPaginatedResult
    getTransferAll(id: ID!): TransferResultAll 
    filterActivity(input: FilterActivityInput) : ActivityResultAll
  }

  type Mutation {
    createActivity(input: CreateActivityInput!): ActivityResult
    updateActivity(input: UpdateActivityInput!): ActivityResult
    createUser(input: CreateUserInput!): UserResponse
    updateUser(input: UpdateUserInput!): UserResponse
    deleteUser(id: ID!): UserResponse
    loginUser(input: LoginUserInput!): UserResponse
    changePassword(input: ChangePassword!): UserResponse
    forgetPassword(input: ForgetPassword!): ForgetPassResponse
    resetPassword(input: ResetPassword): ForgetPassResponse
    updateSetting(input: UpdateSettingInput!): settingResult
    createTransfer(input: CreateTransferInput!): TransferResult
    deleteTransfer(id: ID!): TransferResult
    updateTransfer(input: UpdateTransferInput): TransferResult
  }
`);
