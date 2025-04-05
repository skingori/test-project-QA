import { expect, Page } from "@playwright/test";

export default class WebTablesPage {
  readonly addButton;
  readonly ageInputField;
  readonly assertDatatableTitle;
  readonly departmentInputField;
  readonly errorAlert;
  readonly firstNameInputField;
  readonly lastNameInputField;
  readonly page: Page;
  readonly salaryInputField;
  readonly submitButton;
  readonly submitTableButton;
  readonly userEmailInputField;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInputField = page.locator('input[id="firstName"]');
    this.lastNameInputField = page.locator('input[id="lastName"]');
    this.userEmailInputField = page.locator('input[id="userEmail"]');
    this.salaryInputField = page.locator('input[id="salary"]');
    this.departmentInputField = page.locator('input[id="department"]');
    this.ageInputField = page.locator('input[id="age"]');
    this.addButton = page.locator('button[id="addNewRecordButton"]');
    this.assertDatatableTitle = page.locator('div[id="registration-form-modal"]');
    this.submitButton = page.locator('button[id="login"]');
    this.submitTableButton = page.locator('button[id="submit"]');
    this.errorAlert = page.locator("#name");
  }

  public async addDataTableButton() {
    await this.addButton.click();
  }

  public async assertCurrentPage() {
    await expect(this.page).toHaveURL("/tables");
  }

  public async assertErrorAlert(message: string) {
    await expect(this.errorAlert).toHaveText(message);
  }

  public async assertGridCellText(name: string, lastName: string, salary: string, email: string) {
    this.page.getByRole("gridcell", { exact: true, name: email });
    this.page.getByRole("gridcell", { exact: true, name: name });
    this.page.getByRole("gridcell", { exact: true, name: lastName });
    this.page.getByRole("gridcell", { exact: true, name: salary });

    await expect(this.page.getByRole("gridcell", { exact: true, name: email })).toHaveText(email);
    await expect(this.page.getByRole("gridcell", { exact: true, name: name })).toHaveText(name);
    await expect(this.page.getByRole("gridcell", { exact: true, name: lastName })).toHaveText(lastName);
    await expect(this.page.getByRole("gridcell", { exact: true, name: salary })).toHaveText(salary);
  }

  public async clickSubmitButton() {
    await this.submitButton.click();
  }

  public async clickSubmitTableButton() {
    await this.submitTableButton.click();
  }

  public async DatatableTitle() {
    await expect(this.assertDatatableTitle).toHaveText("Registration Form");
  }

  public async fillAge(age: string) {
    await this.ageInputField.fill(age);
  }

  public async fillDepartment(department: string) {
    await this.departmentInputField.fill(department);
  }

  public async fillEmail(email: string) {
    await this.userEmailInputField.fill(email);
  }
  public async fillFirstName(firstName: string) {
    await this.firstNameInputField.fill(firstName);
  }

  public async fillLastName(lastName: string) {
    await this.lastNameInputField.fill(lastName);
  }

  public async fillSalary(salary: string) {
    await this.salaryInputField.fill(salary);
  }

  public async fillUserEmail(userEmail: string) {
    await this.userEmailInputField.fill(userEmail);
  }

  public async goto() {
    await this.page.goto("/webtables");
  }
}
