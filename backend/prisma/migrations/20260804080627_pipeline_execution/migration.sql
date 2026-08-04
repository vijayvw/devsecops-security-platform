-- DropIndex
DROP INDEX "pipeline_runs_pipelineId_idx";

-- DropIndex
DROP INDEX "pipeline_runs_status_idx";

-- AlterTable
ALTER TABLE "pipeline_runs" ADD COLUMN     "logs" TEXT,
ADD COLUMN     "trigger" TEXT,
ADD COLUMN     "triggeredBy" TEXT,
ADD COLUMN     "workflowRunId" TEXT;
