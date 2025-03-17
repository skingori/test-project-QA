import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed Roles
    const adminRole = await prisma.role.upsert({
      create: {
        description: "Administrator role with full permissions",
        id: BigInt(1), // Use a consistent ID
        is_disabled: false,
        name: "Admin",
      },
      update: {}, // Do nothing if already exists
      where: { name: "Admin" },
    });

    const userRole = await prisma.role.upsert({
      create: {
        description: "Regular user role with limited permissions",
        id: BigInt(2), // Use a consistent ID
        is_disabled: false,
        name: "User",
      },
      update: {},
      where: { name: "User" },
    });

    console.log("Roles seeded:", { adminRole, userRole });

    // Seed AppUser
    const user = await prisma.appUser.upsert({
      create: {
        cannot_change_password: false,
        email: "johndoe@example.com",
        enabled: true,
        firstname: "John",
        id: BigInt(1), // Use a consistent ID
        last_time_password_updated: new Date(),
        lastname: "Doe",
        nonlocked: true,
        password: "securepassword123", // Use hashed password in production
        password_never_expires: false,
        roles: {
          create: [
            { role_id: adminRole.id }, // Link to Admin Role
            { role_id: userRole.id }, // Link to User Role
          ],
        },
        username: "johndoe",
      },
      update: {}, // Do nothing if already exists
      where: { username: "johndoe" },
    });

    console.log("AppUser seeded:", user);

    // Seed UserPhone
    const userPhone = await prisma.userPhone.upsert({
      create: {
        orderIndex: 1,
        phone: "1234567890",
        phoneCountryId: 254, // Country code for Kenya
        userId: user.id, // Associate with the created user
      },
      update: {}, // Do nothing if already exists
      where: { id: 1 }, // Use a unique identifier like 'id'
    });

    console.log("UserPhone seeded:", userPhone);
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
}
void seed();
