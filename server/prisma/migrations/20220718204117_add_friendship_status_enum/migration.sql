-- CreateEnum
CREATE TYPE "friendship_status_enum" AS ENUM ('pendiente', 'aceptada', 'bloqueada');

-- AlterTable
ALTER TABLE "friendship" ADD COLUMN     "status" "friendship_status_enum" NOT NULL DEFAULT 'pendiente';
