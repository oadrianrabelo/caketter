/*
  Warnings:

  - You are about to drop the column `idUser` on the `cake` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `costumer` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cake" DROP CONSTRAINT "cake_idUser_fkey";

-- DropForeignKey
ALTER TABLE "costumer" DROP CONSTRAINT "costumer_idUser_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_idUser_fkey";

-- AlterTable
ALTER TABLE "cake" DROP COLUMN "idUser",
ADD COLUMN     "id_user" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "costumer" DROP COLUMN "idUser",
ADD COLUMN     "id_user" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "idUser",
ADD COLUMN     "id_user" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "costumer" ADD CONSTRAINT "costumer_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cake" ADD CONSTRAINT "cake_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
