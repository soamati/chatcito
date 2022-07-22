/*
  Warnings:

  - A unique constraint covering the columns `[sender_id,target_id,room_id]` on the table `invitation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "invitation_sender_id_target_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "invitation_sender_id_target_id_room_id_key" ON "invitation"("sender_id", "target_id", "room_id");
