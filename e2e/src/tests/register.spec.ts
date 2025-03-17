/* eslint-disable playwright/no-conditional-in-test */
/* eslint-disable playwright/no-conditional-expect */
import axios from "axios";

import { ERROR_MESSAGES } from "../../constants/constants";
import { generateLoginData } from "../../data/generateData";
import { createUserAccount } from "../../requests/makeRequests";
import { expect, SignupTest as test } from "../fixtures/registerPage.fixture";

let loginUsername: string;

async function registerUser() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await createUserAccount();
  if ("username" in response.data) {
    const { username } = response.data;
    loginUsername = username;
  } else {
    throw new Error("Failed to create user account");
  }
}

test.describe("Registration Page Tests", () => {
  test.beforeEach(async ({ SignupPage }) => {
    await SignupPage.goto();
  });

  test("should show an error when firstname is empty", async ({ SignupPage }) => {
    await SignupPage.fillFirstName("");
    await SignupPage.fillLastName("Doe");
    await SignupPage.fillUsername("johndoe");
    await SignupPage.fillPassword("password123");
    await SignupPage.submitButton.click();
    await SignupPage.assertFisrtNameBoarderErrorColor();
  });
});

test.describe("API registration tests", () => {
  test.beforeAll(async () => {
    await registerUser();
  });
  test("should register a new user successfully", async () => {
    const user = generateLoginData();
    const response = await createUserAccount(user);
    expect(response.status).toBe(201);
  });

  test("Should not create user with an existing username", async () => {
    const user = generateLoginData();
    user.userName = loginUsername;
    try {
      await createUserAccount(user);
      expect(false).toBeTruthy();
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        console.error("Unexpected error:", error);
        throw error;
      }
      const status = error.response?.status ?? 0;
      expect(status).toBe(406);
    }
  });

  test("Should not create user with a short password", async () => {
    const user = generateLoginData();
    user.password = "123";
    try {
      await createUserAccount(user);
      expect(false).toBeTruthy();
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        console.error("Unexpected error:", error);
        throw error;
      }
      const status = error.response?.status ?? 0;
      expect(status).toBe(400);
      expect(error.response?.data).toEqual({
        code: "1300",
        message: ERROR_MESSAGES.SHORT_PASSWORD,
      });
    }
  });
});
