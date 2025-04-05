import { WebTablesPageTests as test } from "../fixtures/webTablePage.fixture";

test.describe("DataTable tests", () => {
  test("Add a new user", async ({ UserInfo, WebTables }) => {
    await WebTables.addDataTableButton();
    await WebTables.DatatableTitle();
    await WebTables.fillFirstName(UserInfo.firstName);
    await WebTables.fillLastName(UserInfo.lastName);
    await WebTables.fillSalary(UserInfo.salary);
    await WebTables.fillDepartment(UserInfo.department);
    await WebTables.fillAge(UserInfo.age);
    await WebTables.fillEmail(UserInfo.email);
    await WebTables.clickSubmitTableButton();
    await WebTables.assertGridCellText(UserInfo.firstName, UserInfo.lastName, UserInfo.salary, UserInfo.email);
  });
});
