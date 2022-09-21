-- CreateTable
CREATE TABLE "cake" (
    "id" SERIAL NOT NULL,
    "dough" TEXT NOT NULL,
    "filling" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "theme" TEXT NOT NULL,
    "name_top" TEXT,
    "age_top" TEXT,

    CONSTRAINT "cake_pkey" PRIMARY KEY ("id")
);
