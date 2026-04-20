/*
  Warnings:

  - The values [PENDING] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `address` on the `Delivery` table. All the data in the column will be lost.
  - The `status` column on the `Delivery` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `cost_price` on the `ImportDetail` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `total_amount` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `price` on the `OrderDetail` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - The `method` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `PurchaseDetail` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `total_amount` on the `PurchaseOrder` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `total_amount` on the `Refund` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `price` on the `RefundDetail` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `total_amount` on the `Sale` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `price` on the `SaleDetail` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - A unique constraint covering the columns `[import_code]` on the table `Import` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_code]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[purchase_code]` on the table `PurchaseOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refund_code]` on the table `Refund` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address_id` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `import_code` to the `Import` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_code` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_code` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchase_code` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refund_code` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'TRANSFER');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('WAITING_PAYMENT', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'WAITING_PAYMENT';
COMMIT;

-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_order_id_fkey";

-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "address",
ADD COLUMN     "address_id" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT DEFAULT 'Anousith Express',
ADD COLUMN     "tracking_number" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "DeliveryStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Import" ADD COLUMN     "import_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ImportDetail" ALTER COLUMN "cost_price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "order_code" TEXT NOT NULL,
ALTER COLUMN "total_amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "OrderDetail" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE INTEGER,
DROP COLUMN "method",
ADD COLUMN     "method" "PaymentMethod" NOT NULL DEFAULT 'CASH';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "product_code" TEXT NOT NULL,
ADD COLUMN     "purchase_price" INTEGER,
ADD COLUMN     "sale_price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseDetail" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "purchase_code" TEXT NOT NULL,
ALTER COLUMN "total_amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Refund" ADD COLUMN     "refund_code" TEXT NOT NULL,
ALTER COLUMN "total_amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "RefundDetail" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "total_amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "SaleDetail" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "AddressBranch" (
    "address_id" TEXT NOT NULL,
    "province_id" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,
    "branch_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AddressBranch_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "Province" (
    "province_id" TEXT NOT NULL,
    "province_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("province_id")
);

-- CreateTable
CREATE TABLE "District" (
    "district_id" TEXT NOT NULL,
    "district_name" TEXT NOT NULL,
    "province_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("district_id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "branch_id" TEXT NOT NULL,
    "branch_name" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("branch_id")
);

-- CreateIndex
CREATE INDEX "AddressBranch_province_id_idx" ON "AddressBranch"("province_id");

-- CreateIndex
CREATE INDEX "AddressBranch_district_id_idx" ON "AddressBranch"("district_id");

-- CreateIndex
CREATE INDEX "AddressBranch_branch_id_idx" ON "AddressBranch"("branch_id");

-- CreateIndex
CREATE UNIQUE INDEX "AddressBranch_province_id_district_id_branch_id_key" ON "AddressBranch"("province_id", "district_id", "branch_id");

-- CreateIndex
CREATE INDEX "District_province_id_idx" ON "District"("province_id");

-- CreateIndex
CREATE INDEX "Branch_district_id_idx" ON "Branch"("district_id");

-- CreateIndex
CREATE INDEX "Delivery_address_id_idx" ON "Delivery"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Import_import_code_key" ON "Import"("import_code");

-- CreateIndex
CREATE UNIQUE INDEX "Order_order_code_key" ON "Order"("order_code");

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_code_key" ON "Product"("product_code");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_purchase_code_key" ON "PurchaseOrder"("purchase_code");

-- CreateIndex
CREATE UNIQUE INDEX "Refund_refund_code_key" ON "Refund"("refund_code");

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "AddressBranch"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressBranch" ADD CONSTRAINT "AddressBranch_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("province_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressBranch" ADD CONSTRAINT "AddressBranch_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("district_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressBranch" ADD CONSTRAINT "AddressBranch_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("province_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("district_id") ON DELETE CASCADE ON UPDATE CASCADE;
