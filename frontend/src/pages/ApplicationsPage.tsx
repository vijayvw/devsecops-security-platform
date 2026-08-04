import { ApplicationsGrid } from "../modules/applications";

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Applications
        </h1>

        <p className="mt-2 text-gray-500">
          Manage all applications in your DevSecOps platform.
        </p>
      </div>

      <ApplicationsGrid />
    </div>
  );
}