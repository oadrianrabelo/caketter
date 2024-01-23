/*
  Warnings:

  - You are about to drop the column `adress_id` on the `costumer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "costumer" DROP CONSTRAINT "costumer_adress_id_fkey";

-- AlterTable
ALTER TABLE "address" ALTER COLUMN "costumer_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "costumer" DROP COLUMN "adress_id",
ADD COLUMN     "address_id" INTEGER;

-- AddForeignKey
ALTER TABLE "costumer" ADD CONSTRAINT "costumer_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
