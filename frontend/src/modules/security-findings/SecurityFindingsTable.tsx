import { useEffect, useMemo, useState } from "react";

import Drawer from "../../components/Drawer";

import {
  securityFindingsApi,
  type Finding,
} from "../../api/security-findings";

const badgeColors: Record<string, string> = {
  CRITICAL:
    "bg-red-100 text-red-700 border border-red-200",

  HIGH:
    "bg-orange-100 text-orange-700 border border-orange-200",

  MEDIUM:
    "bg-yellow-100 text-yellow-700 border border-yellow-200",

  LOW:
    "bg-green-100 text-green-700 border border-green-200",

  INFO:
    "bg-blue-100 text-blue-700 border border-blue-200",
};

const severityIcons: Record<string, string> = {
  CRITICAL: "🚨",
  HIGH: "🔴",
  MEDIUM: "🟠",
  LOW: "🟢",
  INFO: "🔵",
};

const toolIcons: Record<string, string> = {
  TRIVY: "🛡️",
  CHECKOV: "☸️",
  SEMGREP: "🔍",
  GITLEAKS: "🔑",
  DEPENDENCY_CHECK: "📦",
};

export default function SecurityFindingsTable() {
  const [findings, setFindings] =
    useState<Finding[]>([]);

  const [selectedFinding, setSelectedFinding] =
    useState<Finding | null>(null);

  const [search, setSearch] =
    useState("");

  const [severityFilter, setSeverityFilter] =
    useState("ALL");

  const [toolFilter, setToolFilter] =
    useState("ALL");

  useEffect(() => {
    securityFindingsApi
      .getAll()
      .then(setFindings)
      .catch(console.error);
  }, []);

  const filteredFindings = useMemo(() => {
    return findings.filter((finding) => {
      const text = search.toLowerCase();

      const matchesSearch =
        finding.title.toLowerCase().includes(text) ||
        finding.description.toLowerCase().includes(text) ||
        (finding.file ?? "")
          .toLowerCase()
          .includes(text) ||
        (finding.rule ?? "")
          .toLowerCase()
          .includes(text) ||
        (finding.tool ?? "")
          .toLowerCase()
          .includes(text);

      const matchesSeverity =
        severityFilter === "ALL" ||
        finding.severity === severityFilter;

      const matchesTool =
        toolFilter === "ALL" ||
        finding.tool === toolFilter;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesTool
      );
    });
  }, [
    findings,
    search,
    severityFilter,
    toolFilter,
  ]);

  const stats = {
    total: findings.length,

    critical: findings.filter(
      (f) => f.severity === "CRITICAL"
    ).length,

    high: findings.filter(
      (f) => f.severity === "HIGH"
    ).length,

    medium: findings.filter(
      (f) => f.severity === "MEDIUM"
    ).length,

    low: findings.filter(
      (f) => f.severity === "LOW"
    ).length,
  };

  return (
    <>
      <div className="space-y-8">

        {/* Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-3xl shadow-lg">
                  🛡️
                </div>

                <div>

                  <h1 className="text-4xl font-bold">
                    Security Findings
                  </h1>

                  <p className="mt-2 text-slate-300">
                    Browse, investigate and remediate vulnerabilities detected
                    across your DevSecOps platform.
                  </p>

                </div>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <SummaryCard
                title="Total Findings"
                value={stats.total}
                color="bg-slate-700"
              />

              <SummaryCard
                title="Critical"
                value={stats.critical}
                color="bg-red-600"
              />

              <SummaryCard
                title="High"
                value={stats.high}
                color="bg-orange-500"
              />

              <SummaryCard
                title="Medium"
                value={stats.medium}
                color="bg-yellow-500"
              />

            </div>

          </div>

        </div>

        {/* Filters */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search title, rule, file, CVE or scanner..."
              className="w-full rounded-xl border px-4 py-3 lg:w-96"
            />

            <div className="flex flex-wrap gap-3">

              <select
                value={severityFilter}
                onChange={(e) =>
                  setSeverityFilter(e.target.value)
                }
                className="rounded-xl border px-4 py-3"
              >
                <option value="ALL">
                  All Severities
                </option>

                <option value="CRITICAL">
                  Critical
                </option>

                <option value="HIGH">
                  High
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="LOW">
                  Low
                </option>

              </select>

              <select
                value={toolFilter}
                onChange={(e) =>
                  setToolFilter(e.target.value)
                }
                className="rounded-xl border px-4 py-3"
              >
                <option value="ALL">
                  All Tools
                </option>

                <option value="TRIVY">
                  Trivy
                </option>

                <option value="CHECKOV">
                  Checkov
                </option>

                <option value="SEMGREP">
                  Semgrep
                </option>

                <option value="GITLEAKS">
                  Gitleaks
                </option>

                <option value="DEPENDENCY_CHECK">
                  Dependency Check
                </option>

              </select>

            </div>

          </div>

        </div>
        <div className="flex items-center justify-between">

  <p className="text-sm text-slate-500">
    Showing <strong>{filteredFindings.length}</strong> findings
  </p>

</div>

        {filteredFindings.length === 0 ? (

          <div className="rounded-3xl border border-dashed bg-white p-20 text-center">

            <div className="text-6xl">
              ✅
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No Findings
            </h2>

            <p className="mt-3 text-slate-500">
              No vulnerabilities match your current filters.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {filteredFindings.map((finding) => (

              <div
                key={finding.id}
                onClick={() =>
                  setSelectedFinding(finding)
                }
                className="cursor-pointer rounded-3xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
              >

                <div className="flex items-start justify-between gap-6">

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          badgeColors[
                            finding.severity
                          ]
                        }`}
                      >
                        {
                          severityIcons[
                            finding.severity
                          ]
                        }{" "}
                        {finding.severity}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">

                        {
                          toolIcons[
                            finding.tool ?? ""
                          ]
                        }{" "}
                        {finding.tool}

                      </span>

                      {finding.line != null && (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                          📍 Line {finding.line}
                        </span>
                      )}

                      {finding.fixed && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          ✅ Fixed
                        </span>
                      )}

                    </div>

                    <h3 className="mt-5 text-2xl font-bold text-slate-900">
                      {finding.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {finding.description}
                    </p>

                    {finding.file && (

                      <div className="mt-5 rounded-xl bg-slate-50 p-4">

                        <div className="text-xs uppercase tracking-wider text-slate-500">
                          File
                        </div>

                        <code className="mt-2 block break-all text-sm">

                          <div
  className="truncate"
  title={finding.file}
>
  {finding.file.split("/").pop()}
</div>

                        </code>

                      </div>

                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-3">

                      {finding.rule && (

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                          {finding.rule}

                        </span>

                      )}

                      {finding.cve && (

                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">

                          {finding.cve}

                        </span>

                      )}

                    </div>

                    {finding.recommendation && (

                      <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">

                        <div className="font-semibold text-green-700">
                          💡 Recommendation
                        </div>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-700">

                          {finding.recommendation}

                        </p>

                      </div>

                    )}

                  </div>

                  <div className="flex items-center">

                    <div className="rounded-xl bg-blue-50 px-5 py-3 font-semibold text-blue-700 transition group-hover:bg-blue-100">

                      Inspect Finding →

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <Drawer
        open={selectedFinding !== null}
        onClose={() =>
          setSelectedFinding(null)
        }
      title={
  selectedFinding
    ? selectedFinding.title
    : "Finding Details"
}
      >

        {selectedFinding && (

          <div className="space-y-8">

            {/* Header */}

            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white">

              <div className="flex items-start justify-between">

                <div>

                  <div className="flex flex-wrap items-center gap-3">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        badgeColors[
                          selectedFinding.severity
                        ]
                      }`}
                    >

                      {
                        severityIcons[
                          selectedFinding.severity
                        ]
                      }{" "}

                      {selectedFinding.severity}

                    </span>

                    <span className="rounded-full bg-slate-700 px-3 py-1 text-xs">

                      {
                        toolIcons[
                          selectedFinding.tool ?? ""
                        ]
                      }{" "}

                      {selectedFinding.tool}

                    </span>

                    <span className="rounded-full bg-slate-700 px-3 py-1 text-xs">

                      {selectedFinding.fixed
                        ? "✅ Fixed"
                        : "❌ Open"}

                    </span>

                  </div>

                  <h2 className="mt-5 text-3xl font-bold">

                    {selectedFinding.title}

                  </h2>

                </div>

              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <InfoCard
                label="Rule"
                value={
                  selectedFinding.rule ??
                  "-"
                }
              />

              <InfoCard
                label="Line"
                value={
                  selectedFinding.line?.toString() ??
                  "-"
                }
              />

              <InfoCard
                label="Tool"
                value={
                  selectedFinding.tool ??
                  "-"
                }
              />

              <InfoCard
                label="Status"
                value={
                  selectedFinding.fixed
                    ? "Fixed"
                    : "Open"
                }
              />

            </div>
                        {selectedFinding.file && (

              <div className="rounded-2xl border bg-slate-50 p-5">

  <div className="mb-3 flex items-center justify-between">

    <div className="text-xs uppercase tracking-wider text-slate-500">
      Source File
    </div>

    <button
      onClick={() =>
        navigator.clipboard.writeText(selectedFinding.file!)
      }
      className="rounded-lg bg-slate-900 px-3 py-1 text-xs text-white hover:bg-slate-700"
    >
      Copy
    </button>

  </div>

  <code className="block break-all text-sm">
    {selectedFinding.file}
  </code>

</div>

            )}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

              <h3 className="text-lg font-semibold">
                Description
              </h3>

              <p className="mt-4 leading-7 text-slate-600">

                {selectedFinding.description}

              </p>

            </div>

            {selectedFinding.recommendation && (

              <div className="rounded-2xl border border-green-300 bg-green-50 p-6">

                <h3 className="font-semibold text-green-700">
                  💡 Recommendation
                </h3>

                <p className="mt-4 leading-7 text-slate-700">

                  {selectedFinding.recommendation}

                </p>

              </div>

            )}

            {selectedFinding.cve && (

              <div className="rounded-2xl border bg-white p-6">

                <div className="flex items-center justify-between">

  <h3 className="font-semibold">
    CVE Reference
  </h3>

  <button
    onClick={() =>
      navigator.clipboard.writeText(
        selectedFinding.cve!
      )
    }
    className="rounded-lg bg-slate-900 px-3 py-1 text-xs text-white"
  >
    Copy CVE
  </button>

</div>

                <a
                  href={
                    selectedFinding.cve.startsWith("GHSA-")
                      ? `https://github.com/advisories/${selectedFinding.cve}`
                      : `https://nvd.nist.gov/vuln/detail/${selectedFinding.cve}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block font-medium text-blue-600 hover:underline"
                >

                  {selectedFinding.cve}

                </a>

              </div>

            )}

            <div className="flex justify-end border-t pt-6">

              <button
                onClick={() =>
                  setSelectedFinding(null)
                }
                className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                Close Inspection
              </button>

            </div>

          </div>

        )}

      </Drawer>

    </>

  );
}

function SummaryCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (

    <div className="rounded-2xl bg-slate-800 p-5">

      <div className="flex items-center justify-between">

        <div>

          <div className="text-xs uppercase tracking-wider text-slate-400">
            {title}
          </div>

          <div className="mt-3 text-3xl font-bold text-white">
            {value}
          </div>

        </div>

        <div
          className={`h-4 w-4 rounded-full ${color}`}
        />

      </div>

    </div>

  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (

    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="text-xs uppercase tracking-wider text-slate-500">

        {label}

      </div>

      <div className="mt-3 break-all text-lg font-semibold text-slate-900">

        {value}

      </div>

    </div>

  );
}