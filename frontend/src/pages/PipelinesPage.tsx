import { PipelinesGrid } from "../modules/pipelines";

export default function PipelinesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Pipelines
        </h1>

        <p className="mt-2 text-gray-500">
          View CI/CD pipelines across all applications.
        </p>
      </div>

      <PipelinesGrid />
    </div>
  );
}