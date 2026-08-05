import { useEffect, useState } from "react";

import {
  applicationsApi,
  type Application,
} from "../../api/applications";

import ApplicationCard from "./ApplicationCard";
import ApplicationDrawer from "./ApplicationDrawer";

export default function ApplicationsGrid() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [selected, setSelected] =
    useState<Application | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await applicationsApi.getAll();

        setApplications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center text-slate-400">
        Loading applications...
      </div>
    );
  }

  return (
    <>
      <section className="space-y-6">

        {/* Header */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Applications
            </h2>

            <p className="mt-2 text-slate-400">
              Connected repositories monitored by the
              DevSecOps platform.
            </p>

          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-4">

            <p className="text-xs uppercase tracking-widest text-slate-400">
              Total Applications
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {applications.length}
            </p>

          </div>

        </div>

        {applications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-20 text-center">

            <div className="text-6xl">
              📦
            </div>

            <h3 className="mt-6 text-2xl font-bold text-white">
              No Applications Found
            </h3>

            <p className="mt-3 text-slate-400">
              Import your first GitHub repository to
              start scanning for vulnerabilities.
            </p>

          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 2xl:grid-cols-3">

            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onClick={() =>
                  setSelected(application)
                }
              />
            ))}

          </div>
        )}

      </section>

      <ApplicationDrawer
        application={selected}
        onClose={() =>
          setSelected(null)
        }
      />
    </>
  );
}