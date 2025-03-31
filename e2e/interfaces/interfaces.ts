export interface Book {
  author: string;
  description: string;
  isbn: string;
  pages: number;
  publish_date: string; // ISO 8601 format
  publisher: string;
  subTitle: string;
  title: string;
  website: string;
}

export interface getBooksResponse {
  books: [
    {
      author: string;
      description: string;
      isbn: string;
      pages: 0;
      publish_date: string; // ISO 8601 format
      publisher: string;
      subTitle: string;
      title: string;
      website: string;
    },
  ];
}
export interface UserResponse {
  books: Book[];
  userID: string;
  username: string;
}

export interface GenerateTokenResponse {
  expires: string; // ISO 8601 format
  result: string;
  status: string;
  token: string;
}

export interface GenerateTokenRequest {
  password: string;
  userName: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
}

export interface BooksResponse {
  books: [
    {
      isbn: string;
    },
  ];
}

export interface UserRequest {
  password: string;
  userName: string;
}

export interface BookRequest {
  collectionOfIsbns: [
    {
      isbn: string;
    },
  ];
  userId: string;
}
