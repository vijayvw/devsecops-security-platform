import { useEffect, useMemo, useState } from "react";

import {
  securityScansApi,
  type SecurityScan,
} from "../../api/security-scans";

import StatusBadge from "./StatusBadge";
import SecurityScanDrawer from "./SecurityScanDrawer";

const toolIcons: Record<string, string> = {
  TRIVY: "🛡️",
  SEMGREP: "🔍",
  GITLEAKS: "🔑",
  CHECKOV: "☸️",
  DEPENDENCY_CHECK: "📦",
};

export default function SecurityScansTable() {
  const [scans, setScans] =
    useState<SecurityScan[]>([]);

  const [selected, setSelected] =
    useState<SecurityScan | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [toolFilter, setToolFilter] =
    useState("ALL");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  async function loadScans() {
    try {
      setLoading(true);

      const data =
        await securityScansApi.getAll();

      setScans(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadScans();

    const timer = setInterval(
      loadScans,
      3000
    );

    return () =>
      clearInterval(timer);
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
          new Date(
            b.startedAt
          ).getTime() -
          new Date(
            a.startedAt
          ).getTime()
      );
  }, [
    scans,
    search,
    toolFilter,
    statusFilter,
  ]);

  const stats = {
    total: scans.length,

    passed: scans.filter(
      (s) =>
        s.status === "PASSED" ||
        s.status === "SUCCESS"
    ).length,

    failed: scans.filter(
      (s) =>
        s.status === "FAILED"
    ).length,

    running: scans.filter(
      (s) =>
        s.status === "RUNNING"
    ).length,

    findings: scans.reduce(
      (acc, scan) =>
        acc +
        scan.findings.length,
      0
    ),
  };
    return (
    <>
      <div className="space-y-6">

        {/* Summary */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

          <SummaryCard
            title="Total Scans"
            value={stats.total}
            color="bg-slate-700"
            icon="🛡️"
          />

          <SummaryCard
            title="Passed"
            value={stats.passed}
            color="bg-green-600"
            icon="✅"
          />

          <SummaryCard
            title="Failed"
            value={stats.failed}
            color="bg-red-600"
            icon="❌"
          />

          <SummaryCard
            title="Running"
            value={stats.running}
            color="bg-blue-600"
            icon="🔄"
          />

          <SummaryCard
            title="Findings"
            value={stats.findings}
            color="bg-orange-600"
            icon="🚨"
          />

        </div>

        {/* Main Table */}

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">

          {/* Header */}

          <div className="border-b border-slate-800 p-6">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Security Scans
                </h2>

                <p className="mt-1 text-slate-400">
                  Continuous security scanning across repositories
                </p>

              </div>

              <button
                onClick={loadScans}
                className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
              >
                🔄 Refresh
              </button>

            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="🔍 Search scanner..."
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500"
              />

              <select
                value={toolFilter}
                onChange={(e) =>
                  setToolFilter(e.target.value)
                }
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
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
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
              >
                <option>ALL</option>
                <option>PASSED</option>
                <option>SUCCESS</option>
                <option>FAILED</option>
                <option>RUNNING</option>
                <option>PENDING</option>
              </select>

            </div>

          </div>

          {loading ? (

            <div className="p-20 text-center">

              <div className="text-5xl">
                🔄
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Loading Security Scans
              </h3>

              <p className="mt-2 text-slate-400">
                Fetching latest scan history...
              </p>

            </div>

          ) : filtered.length === 0 ? (

            <div className="p-20 text-center">

              <div className="text-6xl">
                🛡️
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                No Security Scans
              </h3>

              <p className="mt-2 text-slate-400">
                No scan matches your filters.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-950">

                  <tr className="text-left text-xs uppercase tracking-wider text-slate-400">

                    <th className="px-6 py-4">
                      Scanner
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Findings
                    </th>

                    <th className="px-6 py-4">
                      Started
                    </th>

                    <th className="px-6 py-4">
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
                      className="cursor-pointer border-t border-slate-800 transition hover:bg-slate-800/70"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-2xl">

                            {toolIcons[
                              scan.tool
                            ] ?? "🛡️"}

                          </div>

                          <div>

                            <div className="font-semibold text-white">
                              {scan.tool}
                            </div>

                            <div className="mt-1 text-xs text-slate-500">
                              Security Scanner
                            </div>

                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <StatusBadge
                          status={scan.status}
                        />

                      </td>

                      <td className="px-6 py-5">

                        <span className="rounded-full bg-red-500/20 px-3 py-1 text-sm font-semibold text-red-300">

                          {scan.findings.length}

                        </span>

                      </td>

                      <td className="px-6 py-5 text-slate-300">

                        {new Date(
                          scan.startedAt
                        ).toLocaleString()}

                      </td>

                      <td className="px-6 py-5 text-slate-400">

                        {scan.finishedAt
                          ? new Date(
                              scan.finishedAt
                            ).toLocaleString()
                          : "-"}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>
            <SecurityScanDrawer
        scan={selected}
        onClose={() =>
          setSelected(null)
        }
      />
    </>
  );
}

function SummaryCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number;
  color: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-500/10">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-widest text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold text-white">
            {value}
          </h3>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white shadow-lg ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}