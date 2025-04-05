import { DEFAULT_PASSWORD, ERROR_MESSAGES, SHORT_PASSWORD } from "../../constants/constants";
import { createUserAccount } from "../../requests/makeRequests";
import { loginTest as test } from "../fixtures/loginPage.fixture";

async function registerUser() {
  await createUserAccount();
}

test.describe("Login Page Tests", () => {
  test.beforeEach(async () => {
    await registerUser();
  });

  test("Login with valid credentials", async ({ LoginPage }) => {
    await LoginPage.fillUsername(process.env.USERNAME!);
    await LoginPage.fillPassword(process.env.PASSWORD!);
    await LoginPage.clickSubmitButton();
    await LoginPage.assertHomePage(process.env.USERNAME!);
  });

  test("Login with invalid credentials", async ({ LoginPage }) => {
    await LoginPage.fillUsername(process.env.USERNAME!);
    await LoginPage.fillPassword(process.env.PASSWORD! + SHORT_PASSWORD);
    await LoginPage.clickSubmitButton();
    await LoginPage.assertErrorAlert(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  test("Login with empty credentials", async ({ LoginPage }) => {
    await LoginPage.clickSubmitButton();
    await LoginPage.assertUserNameBoarderErrorColor();
    await LoginPage.assertPasswordBoarderErrorColor();
  });

  test("Login with empty password", async ({ LoginPage }) => {
    await LoginPage.fillUsername(process.env.USERNAME!);
    await LoginPage.clickSubmitButton();
    await LoginPage.assertPasswordBoarderErrorColor();
  });

  test("Login with empty Username", async ({ LoginPage }) => {
    await LoginPage.fillPassword(DEFAULT_PASSWORD);
    await LoginPage.clickSubmitButton();
    await LoginPage.assertUserNameBoarderErrorColor();
  });
});
