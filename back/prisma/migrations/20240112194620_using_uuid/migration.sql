/*
  Warnings:

  - You are about to drop the column `id_user` on the `cake` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `costumer` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `order` table. All the data in the column will be lost.
  - Added the required column `user_uuid` to the `cake` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_uuid` to the `costumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_uuid` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cake" DROP CONSTRAINT "cake_id_user_fkey";

-- DropForeignKey
ALTER TABLE "costumer" DROP CONSTRAINT "costumer_id_user_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_id_user_fkey";

-- AlterTable
ALTER TABLE "cake" DROP COLUMN "id_user",
ADD COLUMN     "user_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "costumer" DROP COLUMN "id_user",
ADD COLUMN     "user_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "id_user",
ADD COLUMN     "user_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "costumer" ADD CONSTRAINT "costumer_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cake" ADD CONSTRAINT "cake_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
