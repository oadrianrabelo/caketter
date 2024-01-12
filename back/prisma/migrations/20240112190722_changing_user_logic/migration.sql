-- AlterTable
ALTER TABLE "cake" ADD COLUMN     "idUser" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "costumer" ADD COLUMN     "idUser" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "idUser" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "costumer" ADD CONSTRAINT "costumer_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cake" ADD CONSTRAINT "cake_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
