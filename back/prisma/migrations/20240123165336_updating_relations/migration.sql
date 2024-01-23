/*
  Warnings:

  - Made the column `costumer_id` on table `address` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "costumer" DROP CONSTRAINT "costumer_address_id_fkey";

-- AlterTable
ALTER TABLE "address" ALTER COLUMN "costumer_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_costumer_id_fkey" FOREIGN KEY ("costumer_id") REFERENCES "costumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
