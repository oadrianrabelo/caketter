/*
  Warnings:

  - You are about to drop the column `address` on the `costumer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "costumer" DROP COLUMN "address",
ADD COLUMN     "address_id" INTEGER;

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "avenue" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_ate" TIMESTAMP(3),

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "costumer" ADD CONSTRAINT "costumer_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
