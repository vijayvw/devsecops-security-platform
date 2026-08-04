-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "scanContainers" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "scanDependencies" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "scanIac" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "scanSast" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "scanSecrets" BOOLEAN NOT NULL DEFAULT true;
