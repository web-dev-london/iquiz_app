/*
  Warnings:

  - You are about to drop the column `asnwer` on the `Question` table. All the data in the column will be lost.
  - Added the required column `answer` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Question` DROP COLUMN `asnwer`,
    ADD COLUMN `answer` VARCHAR(191) NOT NULL;
