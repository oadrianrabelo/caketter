-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_costumer_id_fkey";

-- AddForeignKey
ALTER TABLE "costumer" ADD CONSTRAINT "costumer_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
