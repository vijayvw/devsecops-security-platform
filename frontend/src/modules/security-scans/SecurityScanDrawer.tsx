import Drawer from "../../components/Drawer";
import type { SecurityScan } from "../../api/security-scans";
import api from "../../api/client";

interface Props {
  scan: SecurityScan | null;
  onClose: () => void;
}

const severityColors: Record<string, string> = {
  CRITICAL:
    "bg-red-500/20 text-red-400 border border-red-500/30",

  HIGH:
    "bg-orange-500/20 text-orange-400 border border-orange-500/30",

  MEDIUM:
    "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",

  LOW:
    "bg-green-500/20 text-green-400 border border-green-500/30",

  INFO:
    "bg-slate-700 text-slate-300 border border-slate-600",
};

const toolIcons: Record<string, string> = {
  TRIVY: "🛡️",
  SEMGREP: "🔍",
  GITLEAKS: "🔑",
  CHECKOV: "☸️",
  DEPENDENCY_CHECK: "📦",
};

const statusColors: Record<string, string> = {
  PASSED:
    "bg-green-500/20 text-green-400 border border-green-500/30",

  SUCCESS:
    "bg-green-500/20 text-green-400 border border-green-500/30",

  FAILED:
    "bg-red-500/20 text-red-400 border border-red-500/30",

  RUNNING:
    "bg-blue-500/20 text-blue-400 border border-blue-500/30",

  PENDING:
    "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
};

export default function SecurityScanDrawer({
  scan,
  onClose,
}: Props) {
  if (!scan) return null;

const currentScan = scan;

const duration =
    scan.finishedAt
      ? Math.round(
          (new Date(scan.finishedAt).getTime() -
            new Date(scan.startedAt).getTime()) /
            1000
        )
      : null;

  const stats = {
    total: scan.findings.length,

    critical: scan.findings.filter(
      (f) => f.severity === "CRITICAL"
    ).length,

    high: scan.findings.filter(
      (f) => f.severity === "HIGH"
    ).length,

    medium: scan.findings.filter(
      (f) => f.severity === "MEDIUM"
    ).length,

    low: scan.findings.filter(
      (f) => f.severity === "LOW"
    ).length,
  };

  async function handleDownload() {
    try {
      const response = await api.get(
        `/security-scans/${currentScan.id}/report`
      );

      const blob = new Blob(
        [
          JSON.stringify(
            response.data,
            null,
            2
          ),
        ],
        {
          type: "application/json",
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = `${currentScan.tool}-${currentScan.id}.json`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);

      alert(
        "Failed to download report."
      );
    }
  }
    return (
    <Drawer
      open={true}
      onClose={onClose}
      title="Security Scan Details"
    >
      <div className="space-y-8">

        {/* Hero */}

        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white">

          <div className="flex items-start justify-between">

            <div>

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg">
                  {toolIcons[scan.tool] ?? "🛡️"}
                </div>

                <div>

                  <h2 className="text-3xl font-bold">
                    {scan.tool}
                  </h2>

                  <p className="mt-1 text-slate-300">
                    Security Scan Report
                  </p>

                </div>

              </div>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                statusColors[
                  scan.status
                ] ??
                "bg-slate-700 text-white"
              }`}
            >
              {scan.status}
            </span>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">

            <SummaryCard
              title="Findings"
              value={stats.total}
              color="bg-red-600"
              icon="🚨"
            />

            <SummaryCard
              title="Critical"
              value={stats.critical}
              color="bg-red-700"
              icon="⛔"
            />

            <SummaryCard
              title="High"
              value={stats.high}
              color="bg-orange-600"
              icon="⚠️"
            />

            <SummaryCard
              title="Medium + Low"
              value={
                stats.medium +
                stats.low
              }
              color="bg-blue-600"
              icon="🛡️"
            />

          </div>

        </div>

        {/* Scan Information */}

        <div className="grid gap-4 md:grid-cols-2">

          <InfoCard
            icon="🕒"
            label="Started"
            value={new Date(
              scan.startedAt
            ).toLocaleString()}
          />

          <InfoCard
            icon="🏁"
            label="Finished"
            value={
              scan.finishedAt
                ? new Date(
                    scan.finishedAt
                  ).toLocaleString()
                : "Running"
            }
          />

          <InfoCard
            icon="⏱"
            label="Duration"
            value={
              duration
                ? `${duration}s`
                : "-"
            }
          />

          <InfoCard
            icon="🆔"
            label="Scan ID"
            value={scan.id}
          />

        </div>

        {/* Report */}

        {scan.reportPath && (

  <div className="rounded-2xl border bg-white p-6 shadow-sm">

    <div className="flex items-center justify-between">

      <h3 className="text-lg font-semibold">
        Report Location
      </h3>

      <button
        onClick={() =>
          navigator.clipboard.writeText(scan.reportPath!)
        }
        className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
      >
        📋 Copy Path
      </button>

    </div>

    <code className="mt-5 block overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-green-400">

      {scan.reportPath}

    </code>

  </div>

)}

        {/* Findings */}

        <div>

          <div className="mb-5 flex items-center justify-between">

            <h3 className="text-xl font-semibold">
              Vulnerabilities
            </h3>

            <span className="rounded-full bg-slate-100 px-4 py-2 font-semibold">
              {scan.findings.length}
            </span>

          </div>

          {scan.findings.length === 0 ? (

            <div className="rounded-2xl border border-dashed p-12 text-center">

              <div className="text-5xl">
                ✅
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                No Findings
              </h3>

              <p className="mt-2 text-slate-500">
                This scan completed successfully.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {scan.findings.map(
                (finding) => (

                  <div
                    key={finding.id}
                    className="rounded-2xl border bg-white p-6 shadow-sm"
                  >

                    <div className="flex items-start justify-between gap-6">

                      <div className="flex-1">

                        <div className="flex items-center gap-3">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              severityColors[
                                finding.severity
                              ]
                            }`}
                          >
                            {
                              finding.severity
                            }
                          </span>

                          {finding.rule && (
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                              {finding.rule}
                            </span>
                          )}

                        </div>

                        <h4 className="mt-4 text-xl font-semibold">
                          {finding.title}
                        </h4>

                        <p className="mt-3 leading-7 text-slate-600">
                          {
                            finding.description
                          }
                        </p>

                        {finding.file && (

                          <div className="mt-4 rounded-xl bg-slate-50 p-4">

                            <div className="text-xs uppercase text-slate-500">
                              File
                            </div>

                            <code className="mt-2 block break-all text-sm">
                              {finding.file}
                            </code>

                          </div>

                        )}

                        {finding.line != null && (

                          <div className="mt-3 text-sm text-slate-600">
                            Line:{" "}
                            <strong>
                              {finding.line}
                            </strong>
                          </div>

                        )}

                        {finding.cve && (

  <div className="mt-5 flex flex-wrap gap-3">

    <button
      onClick={() =>
        navigator.clipboard.writeText(finding.cve!)
      }
      className="rounded-lg border px-4 py-2 text-sm transition hover:bg-slate-100"
    >
      📋 Copy CVE
    </button>

    <a
      href={
        finding.cve.startsWith("GHSA-")
          ? `https://github.com/advisories/${finding.cve}`
          : `https://nvd.nist.gov/vuln/detail/${finding.cve}`
      }
      target="_blank"
      rel="noreferrer"
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
    >
      🌐 Open Advisory
    </a>

  </div>

)}

                        {finding.recommendation && (

                          <div className="mt-5 rounded-xl border border-green-300 bg-green-50 p-4">

                            <div className="font-semibold text-green-700">
                              💡 Recommendation
                            </div>

                            <p className="mt-2 text-slate-700">
                              {
                                finding.recommendation
                              }
                            </p>

                            <button
  onClick={() =>
    navigator.clipboard.writeText(
      finding.recommendation ?? ""
    )
  }
  className="mt-4 rounded-lg border px-4 py-2 text-sm transition hover:bg-white"
>
  📋 Copy Recommendation
</button>

                          </div>

                        )}

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>
                {/* Actions */}

        <div className="flex justify-end gap-3 border-t pt-6">

          <button
            onClick={handleDownload}
            className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
          >
            📥 Download Report
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            Close
          </button>

        </div>

      </div>
    </Drawer>
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
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="mb-3 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl">
          {icon}
        </div>

        <div className="text-xs uppercase tracking-wider text-slate-500">
          {label}
        </div>

      </div>

      <div className="break-all text-lg font-semibold text-slate-900">
        {value}
      </div>

    </div>
  );
}