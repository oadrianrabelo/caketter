/*
  Warnings:

  - You are about to drop the column `updated_ate` on the `address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_costumer_id_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "updated_ate",
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "costumer" ADD COLUMN     "adress_id" INTEGER;

-- AddForeignKey
ALTER TABLE "costumer" ADD CONSTRAINT "costumer_adress_id_fkey" FOREIGN KEY ("adress_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
