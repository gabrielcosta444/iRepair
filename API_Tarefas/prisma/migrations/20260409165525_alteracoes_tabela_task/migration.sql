/*
  Warnings:

  - You are about to drop the column `completed` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `task` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `device` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issue` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `completed`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `description`,
    ADD COLUMN `client_id` INTEGER NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `device` VARCHAR(191) NOT NULL,
    ADD COLUMN `issue` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Open';
