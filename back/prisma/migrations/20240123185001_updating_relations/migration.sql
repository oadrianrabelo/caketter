-- DropForeignKey
ALTER TABLE "costumer" DROP CONSTRAINT "costumer_address_id_fkey";

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_costumer_id_fkey" FOREIGN KEY ("costumer_id") REFERENCES "costumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
