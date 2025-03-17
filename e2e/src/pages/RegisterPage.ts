import { expect, Page } from "@playwright/test";

export default class SignupPage {
  readonly captchaInputField;
  readonly errorAlert;
  readonly firstNameInputField;
  readonly lastNameInputField;
  readonly page: Page;
  readonly passwordInputField;
  readonly submitButton;
  readonly usernameInputField;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInputField = page.locator('input[id="firstname"]');
    this.lastNameInputField = page.locator('input[id="lastname"]');
    this.usernameInputField = page.locator('input[id="userName"]');
    this.passwordInputField = page.locator('input[id="password"]');
    this.captchaInputField = page.locator("#recaptcha-anchor");
    this.submitButton = page.locator('button[id="register"]');
    this.errorAlert = page.locator('div[role="alert"]');
  }

  public async assertCurrentPage() {
    await expect(this.page).toHaveURL("/register");
  }

  public async assertErrorAlert(message: string) {
    await expect(this.errorAlert).toHaveText(message);
  }

  public async assertFisrtNameBoarderErrorColor() {
    await expect(this.firstNameInputField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  public async assertPasswordBoarderErrorColor() {
    await expect(this.passwordInputField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  public async clickCaptcha() {
    const frame = this.page.frameLocator('iframe[title="reCAPTCHA"]');
    const captcha = frame.locator("#recaptcha-anchor");
    await captcha.click();
    await expect(captcha).toBeChecked();
  }

  public async clickSubmitButton() {
    await this.submitButton.click();
  }

  public async fillFirstName(firstName: string) {
    await this.firstNameInputField.fill(firstName);
  }

  public async fillLastName(lastName: string) {
    await this.lastNameInputField.fill(lastName);
  }

  public async fillPassword(password: string) {
    await this.passwordInputField.fill(password);
  }

  public async fillUsername(username: string) {
    await this.usernameInputField.fill(username);
  }

  public async goto() {
    await this.page.goto("/register");
  }
}
