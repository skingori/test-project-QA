import { expect, Page } from "@playwright/test";

export default class TablePage {
  readonly errorAlert;
  readonly homePage;
  readonly page: Page;
  readonly passwordInputField;
  readonly submitButton;
  readonly usernameInputField;

  constructor(page: Page) {
    // https://demoqa.com/login
    this.page = page;
    this.usernameInputField = page.locator('input[id="userName"]');
    this.passwordInputField = page.locator('input[id="password"]');
    this.submitButton = page.locator('button[id="login"]');
    this.errorAlert = page.locator("#name");
    this.homePage = page.locator(`#userName-value`);
  }

  public async assertCurrentPage() {
    await expect(this.page).toHaveURL("/tables");
  }

  public async assertErrorAlert(message: string) {
    await expect(this.errorAlert).toHaveText(message);
  }

  public async assertHomePage(username: string) {
    await expect(this.homePage).toHaveText(username);
  }

  public async assertPasswordBoarderErrorColor() {
    await expect(this.passwordInputField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  public async assertUserNameBoarderErrorColor() {
    await expect(this.usernameInputField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  public async clickSubmitButton() {
    await this.submitButton.click();
  }
  public async fillPassword(password: string) {
    await this.passwordInputField.fill(password);
  }
  public async fillUsername(username: string) {
    await this.usernameInputField.fill(username);
  }
  public async goto() {
    await this.page.goto("/login");
  }
}
