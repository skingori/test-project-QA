import { faker } from "@faker-js/faker";

import { DEFAULT_PASSWORD } from "../constants/constants";
import { BookRequest, GenerateTokenRequest, UserRequest } from "../interfaces/interfaces";

export function generateBookData(): BookRequest {
  return {
    collectionOfIsbns: [
      {
        isbn: faker.string.uuid(),
      },
    ],
    userId: faker.string.uuid(),
  };
}

export function generateLoginData(): UserRequest {
  return {
    password: DEFAULT_PASSWORD,
    userName: faker.internet.userName(),
  };
}

export function generateTokenData(): GenerateTokenRequest {
  return {
    password: DEFAULT_PASSWORD,
    userName: faker.internet.userName(),
  };
}
