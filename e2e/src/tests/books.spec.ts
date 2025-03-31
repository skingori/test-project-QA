/* eslint-disable playwright/no-conditional-in-test */
/* eslint-disable playwright/no-conditional-expect */

import { generateLoginData } from "../../data/generateData";
import { createUserAccount, generateTokenRequest, getBooksRequest, makeBookRequest } from "../../requests/makeRequests";
import { expect, BooksTests as test } from "../fixtures/bookPage.fixture";

test.describe("API add books", () => {
  test.beforeAll(async () => {
    await createUserAccount();
    const loginDataParam = generateLoginData();
    loginDataParam.userName = process.env.USERNAME!;
    loginDataParam.password = process.env.PASSWORD!;
    await generateTokenRequest(loginDataParam);
  });

  test("should add a new book successfully", async () => {
    await getBooksRequest();
    const response = await makeBookRequest();
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("books");
    expect(response.data.books.length).toBeGreaterThan(0);
    expect(response.data.books[0]).toHaveProperty("isbn");
  });
});
