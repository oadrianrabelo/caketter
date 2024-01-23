/*
  Warnings:

  - You are about to drop the column `address_id` on the `costumer` table. All the data in the column will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_costumer_id_fkey";

-- AlterTable
ALTER TABLE "costumer" DROP COLUMN "address_id",
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "street" TEXT;

-- DropTable
DROP TABLE "address";
