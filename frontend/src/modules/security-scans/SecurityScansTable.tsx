import { useEffect, useMemo, useState } from "react";

import {
  securityScansApi,
  type SecurityScan,
} from "../../api/security-scans";

import StatusBadge from "./StatusBadge";
import ToolBadge from "./ToolBadge";
import SecurityScanDrawer from "./SecurityScanDrawer";

export default function SecurityScansTable() {
  const [scans, setScans] = useState<SecurityScan[]>([]);
  const [selected, setSelected] =
    useState<SecurityScan | null>(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [toolFilter, setToolFilter] =
    useState("ALL");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  async function loadScans() {
    try {
      setLoading(true);
      const data = await securityScansApi.getAll();
      setScans(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadScans();
  }, []);

  const filtered = useMemo(() => {
    return scans
      .filter((scan) => {
        const matchesSearch =
          scan.tool
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesTool =
          toolFilter === "ALL" ||
          scan.tool === toolFilter;

        const matchesStatus =
          statusFilter === "ALL" ||
          scan.status === statusFilter;

        return (
          matchesSearch &&
          matchesTool &&
          matchesStatus
        );
      })
      .sort(
        (a, b) =>
          new Date(b.startedAt).getTime() -
          new Date(a.startedAt).getTime(),
      );
  }, [
    scans,
    search,
    toolFilter,
    statusFilter,
  ]);

  return (
    <>
      <div className="rounded-xl border bg-white shadow">

        <div className="border-b p-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-semibold">
                Security Scans
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Browse and inspect all completed scans.
              </p>

            </div>

            <button
              onClick={loadScans}
              className="rounded-lg border px-4 py-2 hover:bg-slate-50"
            >
              Refresh
            </button>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <input
              className="rounded-lg border p-3"
              placeholder="Search tool..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={toolFilter}
              onChange={(e) =>
                setToolFilter(e.target.value)
              }
              className="rounded-lg border p-3"
            >
              <option>ALL</option>
              <option>TRIVY</option>
              <option>SEMGREP</option>
              <option>GITLEAKS</option>
              <option>CHECKOV</option>
              <option>DEPENDENCY_CHECK</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-lg border p-3"
            >
              <option>ALL</option>
              <option>PASSED</option>
              <option>FAILED</option>
              <option>RUNNING</option>
            </select>

          </div>

        </div>

        {loading ? (

          <div className="p-10 text-center text-slate-500">
            Loading security scans...
          </div>

        ) : filtered.length === 0 ? (

          <div className="p-10 text-center text-slate-500">
            No security scans found.
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4 text-left">
                  Tool
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Findings
                </th>

                <th className="p-4 text-left">
                  Started
                </th>

                <th className="p-4 text-left">
                  Finished
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map((scan) => (

                <tr
                  key={scan.id}
                  onClick={() =>
                    setSelected(scan)
                  }
                  className="cursor-pointer border-t transition hover:bg-slate-50"
                >

                  <td className="p-4">
                    <ToolBadge tool={scan.tool} />
                  </td>

                  <td className="p-4">
                    <StatusBadge
                      status={scan.status}
                    />
                  </td>

                  <td className="p-4 font-semibold">
                    {scan.findings.length}
                  </td>

                  <td className="p-4 text-sm">
                    {new Date(
                      scan.startedAt,
                    ).toLocaleString()}
                  </td>

                  <td className="p-4 text-sm">
                    {scan.finishedAt
                      ? new Date(
                          scan.finishedAt,
                        ).toLocaleString()
                      : "-"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      <SecurityScanDrawer
        scan={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}