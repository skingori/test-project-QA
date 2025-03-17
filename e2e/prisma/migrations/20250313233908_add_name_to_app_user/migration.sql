/*
  Warnings:

  - You are about to drop the `AppUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppUserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `order_index` on the `UserPhone` table. All the data in the column will be lost.
  - You are about to drop the column `phone_country_id` on the `UserPhone` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `UserPhone` table. All the data in the column will be lost.
  - Added the required column `orderIndex` to the `UserPhone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneCountryId` to the `UserPhone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserPhone` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AppUser_username_key";

-- DropIndex
DROP INDEX "Role_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AppUser";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AppUserRole";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Role";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "appuser" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nonlocked" BOOLEAN NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "last_time_password_updated" DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00',
    "password_never_expires" BOOLEAN NOT NULL DEFAULT false,
    "cannot_change_password" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "role" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_disabled" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "appuser_role" (
    "appuser_id" BIGINT NOT NULL,
    "role_id" BIGINT NOT NULL,

    PRIMARY KEY ("appuser_id", "role_id"),
    CONSTRAINT "appuser_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appuser_role_appuser_id_fkey" FOREIGN KEY ("appuser_id") REFERENCES "appuser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserPhone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" BIGINT NOT NULL,
    "phoneCountryId" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    CONSTRAINT "UserPhone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "appuser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserPhone" ("id", "phone") SELECT "id", "phone" FROM "UserPhone";
DROP TABLE "UserPhone";
ALTER TABLE "new_UserPhone" RENAME TO "UserPhone";
PRAGMA foreign_key_check("UserPhone");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "appuser_username_key" ON "appuser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");
