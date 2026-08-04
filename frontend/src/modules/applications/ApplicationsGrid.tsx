import { useEffect, useState } from "react";

import {
  applicationsApi,
  type Application,
} from "../../api/applications";

import ApplicationCard from "./ApplicationCard";
import ApplicationDrawer from "./ApplicationDrawer";

export default function ApplicationsGrid() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selected, setSelected] =
    useState<Application | null>(null);

  useEffect(() => {
    applicationsApi
      .getAll()
      .then(setApplications)
      .catch(console.error);
  }, []);

  if (applications.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        No applications found.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onClick={() => setSelected(application)}
          />
        ))}
      </div>

      <ApplicationDrawer
  application={selected}
  onClose={() => setSelected(null)}
/>
    </>
  );
}