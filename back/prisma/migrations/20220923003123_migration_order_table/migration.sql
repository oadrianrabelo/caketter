/*
  Warnings:

  - You are about to drop the column `createdAt` on the `costumer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `costumer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cake" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "costumer" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "id_costumer" INTEGER NOT NULL,
    "id_cake" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_id_costumer_fkey" FOREIGN KEY ("id_costumer") REFERENCES "costumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_id_cake_fkey" FOREIGN KEY ("id_cake") REFERENCES "cake"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
