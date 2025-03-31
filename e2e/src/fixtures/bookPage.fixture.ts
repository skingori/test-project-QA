import { test as base } from "@playwright/test";

import BooksPage from "../pages/BooksPage";

type BookPageFixtures = {
  BooksPage: BooksPage;
};

export const BooksTests = base.extend<BookPageFixtures>({
  BooksPage: async ({ page }, use) => {
    const bookPage = new BooksPage(page);

    await bookPage.goto();

    await use(bookPage);
  },
});

export { expect } from "@playwright/test";
