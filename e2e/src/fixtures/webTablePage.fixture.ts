import { faker } from "@faker-js/faker";
import { test as base } from "@playwright/test";

import WebTablesPage from "../pages/WebTablesPage";

type WebTablesPageFixtures = {
  UserInfo: {
    age: string;
    department: string;
    email: string;
    firstName: string;
    lastName: string;
    salary: string;
  };

  WebTables: WebTablesPage;
};

export const WebTablesPageTests = base.extend<WebTablesPageFixtures>({
  UserInfo: async ({}, use, testInfo) => {
    const UserInfo = {
      age: faker.number.int({ max: 60, min: 20 }).toString(),
      department: faker.person.jobTitle(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      salary: faker.number.int({ max: 100000, min: 10000 }).toString(),
    };

    await testInfo.attach("User Information", {
      body: JSON.stringify(UserInfo),
      contentType: "application/json",
    });

    await use(UserInfo);
  },
  WebTables: async ({ page }, use) => {
    const webTable = new WebTablesPage(page);

    await webTable.goto();

    await use(webTable);
  },
});

export { expect } from "@playwright/test";
