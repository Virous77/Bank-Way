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
    token: String!
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

   input GetUserRes{
    id: String!
    token: String!
   }

   type UserResponse{
    data: User
    message: String
    status: Int
    token: String
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
    token: String!
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
    token: String!
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
    token: String!
  }

  input PaginatedActivityInput{
    pageNumber: Int
    pageSize: Int
    type: String
    search: String
    user_id: String
    token: String!
  }

  input FilterActivityInput{
    type: String
    token: String!
    id: String!
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
    token: String!
  }

  type settingResult{
     data: Settings
     message: String
    status: Int
    token: String
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
    token: String!
  }

  input UpdateTransferInput {
    id: String!
    isCompleted: Boolean
    token: String!
    user_id: String!
  }

  input GetAllTransferRes {
    id: String!
    token: String!
  }

    input DeleteTransferRes {
    id: String!
    token: String!
    user_id: String
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
    getUser(input: GetUserRes): UserResponse
    getAllUsers: [User]
    getUserSetting(input: GetAllTransferRes!): settingResult
    getPaginatedActivity(input: PaginatedActivityInput) : ActivityPaginatedResult
    getTransferAll(input: GetAllTransferRes!): TransferResultAll 
    filterActivity(input: FilterActivityInput) : ActivityResultAll
  }

  type Mutation {
    createActivity(input: CreateActivityInput!): ActivityResult
    updateActivity(input: UpdateActivityInput!): ActivityResult
    createUser(input: CreateUserInput!): UserResponse
    updateUser(input: UpdateUserInput!): UserResponse
    deleteUser(input: GetUserRes): UserResponse
    loginUser(input: LoginUserInput!): UserResponse
    changePassword(input: ChangePassword!): UserResponse
    forgetPassword(input: ForgetPassword!): ForgetPassResponse
    resetPassword(input: ResetPassword): ForgetPassResponse
    updateSetting(input: UpdateSettingInput!): settingResult
    createTransfer(input: CreateTransferInput!): TransferResult
    deleteTransfer(input: DeleteTransferRes!): TransferResult
    updateTransfer(input: UpdateTransferInput): TransferResult
  }
`);
