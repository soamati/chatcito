/*
  Warnings:

  - You are about to drop the column `ownerId` on the `room` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "room" DROP CONSTRAINT "room_ownerId_fkey";

-- AlterTable
ALTER TABLE "room" DROP COLUMN "ownerId",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
