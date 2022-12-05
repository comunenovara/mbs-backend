/*
  Warnings:

  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Operation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Asset";

-- DropTable
DROP TABLE "Operation";

-- CreateTable
CREATE TABLE "assets" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mq" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "assetId" INTEGER NOT NULL,

    CONSTRAINT "operations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
