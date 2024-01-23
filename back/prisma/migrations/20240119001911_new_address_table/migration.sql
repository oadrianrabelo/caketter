/*
  Warnings:

  - You are about to drop the column `address_id` on the `costumer` table. All the data in the column will be lost.
  - Added the required column `costumer_id` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "costumer" DROP CONSTRAINT "costumer_address_id_fkey";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "costumer_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "costumer" DROP COLUMN "address_id";

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_costumer_id_fkey" FOREIGN KEY ("costumer_id") REFERENCES "costumer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
