-- AlterTable
ALTER TABLE "users_on_rooms" ADD COLUMN     "member_since" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
