import { DEFAULT_PASSWORD, ERROR_MESSAGES } from "../../constants/constants";
import { createUserAccount } from "../../requests/makeRequests";
import { loginTest as test } from "../fixtures/loginPage.fixture";

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

test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ LoginPage }) => {
    await registerUser();
    await LoginPage.goto();
  });

  test("Login with valid credentials", async ({ LoginPage }) => {
    await LoginPage.fillUsername(loginUsername);
    await LoginPage.fillPassword(DEFAULT_PASSWORD);
    await LoginPage.clickSubmitButton();
    await LoginPage.assertHomePage(loginUsername);
  });

  test("Login with invalid credentials", async ({ LoginPage }) => {
    await LoginPage.fillUsername(loginUsername);
    await LoginPage.fillPassword("invalidpassword");
    await LoginPage.clickSubmitButton();
    await LoginPage.assertErrorAlert(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  test("Login with empty credentials", async ({ LoginPage }) => {
    await LoginPage.clickSubmitButton();
    await LoginPage.assertUserNameBoarderErrorColor();
    await LoginPage.assertPasswordBoarderErrorColor();
  });

  test("Login with empty password", async ({ LoginPage }) => {
    await LoginPage.fillUsername(loginUsername);
    await LoginPage.clickSubmitButton();
    await LoginPage.assertPasswordBoarderErrorColor();
  });

  test("Login with empty Username", async ({ LoginPage }) => {
    await LoginPage.fillPassword(DEFAULT_PASSWORD);
    await LoginPage.clickSubmitButton();
    await LoginPage.assertUserNameBoarderErrorColor();
  });
});
