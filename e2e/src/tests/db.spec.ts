import { expect, test } from "@playwright/test";
import { PrismaClient } from "@prisma/client";

import { cleanDatabase, seedDatabase } from "../helpers/dbHelpers";

const prisma = new PrismaClient(); // Initialize Prisma client inside the test

test.describe("Database Seeding and Verification in Tests", () => {
  test.beforeAll(async () => {
    await seedDatabase(); // Seed the database before tests
  });

  test("Verify seeded data in UserPhone", async () => {
    // Verify that the seeded phone exists in the database
    const userPhone = await prisma.userPhone.findFirst({
      where: { phone: "1234567890" },
    });

    // Assertions
    expect(userPhone).not.toBeNull();
    expect(userPhone?.phoneCountryId).toBe(254);
    expect(userPhone?.orderIndex).toBe(1);
    expect(userPhone?.phone).toBe("1234567890");

    await prisma.$disconnect(); // Disconnect the client
  });

  test.afterAll(async () => {
    await cleanDatabase(); // Clean up the database after tests
  });
});
