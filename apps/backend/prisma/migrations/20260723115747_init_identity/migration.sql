/*
  Warnings:

  - You are about to drop the column `deviceInfo` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `isRevoked` on the `RefreshToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `RefreshToken` DROP COLUMN `deviceInfo`,
    DROP COLUMN `ipAddress`,
    DROP COLUMN `isRevoked`;

-- CreateIndex
CREATE UNIQUE INDEX `RefreshToken_userId_key` ON `RefreshToken`(`userId`);
