export interface IUser {
  name: string;
  image: string;
  id: string;
  email: string;
  bio: string;
}

export interface IQuotesType {
  id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  dateAdded: string;
  dateModified: string;
}

export interface ITransaction {
  _id: string;
  name: string;
  type: string;
  type_name: string;
  date: string;
  amount: number;
  is_edited: boolean;
  note: string;
  createdAt: string;
}

export interface ISetting {
  _id: string;
  user_id: string;
  transaction_icon_type: boolean;
  home_transaction_duration: string;
  home_transaction_type: string;
  updatedAt: string;
}

export interface IPayments {
  _id: string;
  transfer_to: string;
  amount: number;
  notes: string;
  createdAt: string;
  isCompleted: boolean;
}
