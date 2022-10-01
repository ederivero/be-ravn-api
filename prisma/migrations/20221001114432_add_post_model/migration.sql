/*
  Warnings:

  - The primary key for the `auths` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uuid` on the `auths` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "auths_uuid_key";

-- AlterTable
ALTER TABLE "auths" DROP CONSTRAINT "auths_pkey",
DROP COLUMN "uuid",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "auths_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "auths_id_seq";

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
