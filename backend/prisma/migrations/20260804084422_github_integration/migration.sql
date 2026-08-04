-- CreateTable
CREATE TABLE "github_integrations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "isConnected" BOOLEAN NOT NULL DEFAULT false,
    "lastChecked" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "github_integrations_pkey" PRIMARY KEY ("id")
);
