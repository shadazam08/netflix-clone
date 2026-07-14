/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ContentStatus" ADD VALUE 'UNDER_REVIEW';
ALTER TYPE "ContentStatus" ADD VALUE 'ARCHIVED';

-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "posterUrl" TEXT,
ADD COLUMN     "searchKeywords" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT;

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "userAgent" TEXT;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "deathDate" TIMESTAMP(3),
ADD COLUMN     "knownFor" TEXT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastUsedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "lastName" TEXT;

-- AlterTable
ALTER TABLE "VideoSource" ADD COLUMN     "bitrate" INTEGER,
ADD COLUMN     "codec" TEXT;

-- CreateIndex
CREATE INDEX "Content_status_type_idx" ON "Content"("status", "type");

-- CreateIndex
CREATE INDEX "Content_status_isFeatured_idx" ON "Content"("status", "isFeatured");

-- CreateIndex
CREATE INDEX "Content_status_releaseYear_idx" ON "Content"("status", "releaseYear");

-- CreateIndex
CREATE INDEX "PlaybackProgress_profileId_updatedAt_idx" ON "PlaybackProgress"("profileId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_name_key" ON "Profile"("userId", "name");

-- CreateIndex
CREATE INDEX "Review_profileId_idx" ON "Review"("profileId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "WatchHistory_profileId_updatedAt_idx" ON "WatchHistory"("profileId", "updatedAt");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
