-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "autoFixEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "repositoryName" TEXT,
ADD COLUMN     "repositoryOwner" TEXT,
ADD COLUMN     "scanOnPullRequest" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "scanOnPush" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "webhookEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "webhookSecret" TEXT;

-- CreateIndex
CREATE INDEX "applications_repositoryOwner_idx" ON "applications"("repositoryOwner");

-- CreateIndex
CREATE INDEX "applications_repositoryName_idx" ON "applications"("repositoryName");

-- CreateIndex
CREATE INDEX "applications_isArchived_idx" ON "applications"("isArchived");
