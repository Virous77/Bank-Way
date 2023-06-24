export interface User {
  name: string;
  image: string;
  _id: string;
  email: string;
  bio: string;
}

export interface QuotesType {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  dateAdded: string;
  dateModified: string;
}
