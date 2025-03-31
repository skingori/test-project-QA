import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Seed function to initialize the database
export async function seedDatabase() {
  const adminRole = await prisma.role.upsert({
    create: {
      description: "Administrator role with full permissions",
      id: BigInt(1),
      is_disabled: false,
      name: "Admin",
    },
    update: {},
    where: { name: "Admin" },
  });

  const userRole = await prisma.role.upsert({
    create: {
      description: "Regular user role with limited permissions",
      id: BigInt(2),
      is_disabled: false,
      name: "User",
    },
    update: {},
    where: { name: "User" },
  });

  const user = await prisma.appUser.upsert({
    create: {
      cannot_change_password: false,
      email: "johndoe@example.com",
      enabled: true,
      firstname: "John",
      id: BigInt(1),
      last_time_password_updated: new Date(),
      lastname: "Doe",
      nonlocked: true,
      password: "securepassword123",
      password_never_expires: false,
      roles: {
        create: [{ role_id: adminRole.id }, { role_id: userRole.id }],
      },
      username: "johndoe",
    },
    update: {},
    where: { username: "johndoe" },
  });

  await prisma.userPhone.upsert({
    create: {
      orderIndex: 1,
      phone: "1234567890",
      phoneCountryId: 254,
      userId: user.id,
    },
    update: {},
    where: { id: 1 },
  });

  console.log("Database seeded for tests.");
}

// Cleanup function to reset the database after tests
export async function cleanDatabase() {
  await prisma.userPhone.deleteMany(); // Clear the UserPhone table
  await prisma.appUserRole.deleteMany(); // Clear the AppUserRole table
  await prisma.appUser.deleteMany();
  console.log("Database cleaned up after tests.");
}
