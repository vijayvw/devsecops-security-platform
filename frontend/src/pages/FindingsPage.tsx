import { useState } from "react";
import Drawer from "../components/Drawer";
import { useFindings } from "../hooks/useFindings";
import type { Finding } from "../api/findings";

const severityColors: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-700",
  HIGH: "bg-orange-100 text-orange-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-green-100 text-green-700",
};

const toolIcons: Record<string, string> = {
  TRIVY: "🛡️",
  SEMGREP: "🔍",
  GITLEAKS: "🔑",
  SNYK: "📦",
};

export default function FindingsPage() {
  const { findings, loading } = useFindings();

  const [selectedFinding, setSelectedFinding] =
    useState<Finding | null>(null);

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading findings...
      </div>
    );
  }

  const rows = Array.isArray(findings) ? findings : [];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            🛡 Security Findings
          </h1>

          <p className="mt-2 text-slate-500">
            All vulnerabilities discovered by your scanners.
          </p>
        </div>

        <div className="rounded-xl border bg-white px-6 py-4 text-center shadow-sm">
          <div className="text-3xl font-bold">
            {rows.length}
          </div>

          <div className="text-sm text-slate-500">
            Findings
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Severity
              </th>

              <th className="p-4 text-left">
                Tool
              </th>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                File
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-10 text-center text-gray-500"
                >
                  No findings found.
                </td>
              </tr>
            ) : (
              rows.map((finding) => (
                <tr
                  key={finding.id}
                  onClick={() => setSelectedFinding(finding)}
                  className="cursor-pointer border-t transition hover:bg-slate-50"
                >
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        severityColors[finding.severity] ??
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {finding.severity}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                      {toolIcons[
                        finding.securityScan.tool
                      ] ?? "🛡️"}

                      {finding.securityScan.tool}
                    </span>
                  </td>

                  <td className="max-w-lg truncate p-4">
                    {finding.title}
                  </td>

                  <td className="p-4">
                    <code className="rounded bg-slate-900 px-2 py-1 text-xs text-white">
                      {finding.file
                        ? finding.file.replace(
                            "/home/vijay/devsecops-security-platform/",
                            ""
                          )
                        : "-"}
                    </code>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer */}

      <Drawer
        open={selectedFinding !== null}
        onClose={() => setSelectedFinding(null)}
        title="🛡 Security Finding"
      >
        {selectedFinding && (
          <div className="space-y-6">
            {/* Header */}

            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    severityColors[
                      selectedFinding.severity
                    ]
                  }`}
                >
                  {selectedFinding.severity}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                  {toolIcons[
                    selectedFinding.securityScan.tool
                  ]}

                  {" "}

                  {selectedFinding.securityScan.tool}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    selectedFinding.securityScan.status ===
                    "FAILED"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {selectedFinding.securityScan.status}
                </span>
              </div>

              <h2 className="line-clamp-3 text-xl font-bold leading-7">
                {selectedFinding.title}
              </h2>

              <div className="mt-5 rounded-lg bg-slate-50 p-4 text-left text-sm leading-7 text-slate-700">
                {selectedFinding.description}
              </div>
            </div>

            {/* Rule + CVE */}

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <p className="text-xs uppercase text-gray-500">
                  Rule
                </p>

                <p className="mt-2 break-words text-sm font-medium">
                  {selectedFinding.rule
                    ?.split(".")
                    .slice(-1)[0] ?? "-"}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-xs uppercase text-gray-500">
                  CVE
                </p>

                <p className="mt-2 text-sm font-medium">
                  {selectedFinding.cve ?? "None"}
                </p>
              </div>
            </div>

            {/* File */}

            <div className="rounded-lg border p-4">
              <p className="text-xs uppercase text-gray-500">
                File
              </p>

              <div className="mt-3 overflow-x-auto rounded bg-slate-900 p-3">
                <code className="text-xs text-white">
                  {selectedFinding.file
                    ? selectedFinding.file.replace(
                        "/home/vijay/devsecops-security-platform/",
                        ""
                      )
                    : "-"}
                </code>
              </div>

              {selectedFinding.line != null && (
                <p className="mt-3 text-sm text-slate-600">
                  <strong>Line:</strong>{" "}
                  {selectedFinding.line}
                </p>
              )}
            </div>

            {/* Recommendation */}

            <div className="rounded-lg border p-4">
              <p className="text-xs uppercase text-gray-500">
                Recommendation
              </p>

              <p className="mt-3 text-sm leading-6">
                {selectedFinding.recommendation ??
                  "No remediation recommendation was provided by the scanner."}
              </p>
            </div>

            {/* Bottom Cards */}

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <p className="text-xs uppercase text-gray-500">
                  Fixed
                </p>

                <p
                  className={`mt-2 text-lg font-bold ${
                    selectedFinding.fixed
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedFinding.fixed
                    ? "✅ Yes"
                    : "❌ No"}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-xs uppercase text-gray-500">
                  Detected
                </p>

                <p className="mt-2 text-sm">
                  {new Date(
                    selectedFinding.createdAt
                  ).toLocaleString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}