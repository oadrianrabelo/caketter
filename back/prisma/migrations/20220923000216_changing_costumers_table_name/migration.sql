/*
  Warnings:

  - You are about to drop the `costumers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "costumers";

-- CreateTable
CREATE TABLE "costumer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "costumer_pkey" PRIMARY KEY ("id")
);
