/*
  Warnings:

  - The `followers` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `following` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "followers",
ADD COLUMN     "followers" INTEGER[],
DROP COLUMN "following",
ADD COLUMN     "following" INTEGER[];
