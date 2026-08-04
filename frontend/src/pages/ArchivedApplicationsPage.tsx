import { useEffect, useState } from "react";
import {
  applicationsApi,
  type Application,
} from "../api/applications";

export default function ArchivedApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    applicationsApi
      .getArchived()
      .then(setApplications);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Archived Applications
      </h1>

      {applications.map((app) => (
        <div
          key={app.id}
          className="rounded-xl border bg-white p-5 flex justify-between items-center"
        >
          <div>
            <h2 className="font-semibold">{app.name}</h2>
            <p className="text-gray-500">
              {app.repositoryUrl}
            </p>
          </div>

          <button
            onClick={async () => {
              await applicationsApi.restore(app.id);
              window.location.reload();
            }}
            className="rounded-lg bg-green-600 px-4 py-2 text-white"
          >
            Restore
          </button>
        </div>
      ))}
    </div>
  );
}
