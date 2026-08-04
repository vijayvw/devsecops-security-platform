import Drawer from "../../components/Drawer";
import type { SecurityScan } from "../../api/security-scans";
import api from "../../api/client";

interface Props {
  scan: SecurityScan | null;
  onClose: () => void;
}

const severityColors: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-700",
  HIGH: "bg-orange-100 text-orange-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-green-100 text-green-700",
  INFO: "bg-slate-100 text-slate-700",
};

const toolIcons: Record<string, string> = {
  TRIVY: "🛡️",
  SEMGREP: "🔍",
  GITLEAKS: "🔑",
  CHECKOV: "☸️",
  DEPENDENCY_CHECK: "📦",
};

export default function SecurityScanDrawer({
  scan,
  onClose,
}: Props) {
  if (!scan) {
    return (
      <Drawer
        open={false}
        onClose={onClose}
        title="Security Scan"
      />
    );
  }

  const duration =
    scan.finishedAt
      ? Math.round(
          (new Date(scan.finishedAt).getTime() -
            new Date(scan.startedAt).getTime()) /
            1000,
        )
      : null;

  const handleDownload = async () => {
  try {
    const response = await api.get(
      `/security-scans/${scan.id}/report`
    );

    const blob = new Blob(
      [JSON.stringify(response.data, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${scan.tool}-${scan.id}.json`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Failed to download report.");
  }
};    

  return (
    <Drawer
      open={true}
      onClose={onClose}
      title="Security Scan Details"
    >
      <div className="space-y-6">

        {/* Header */}

        <div>

          <div className="mb-3 flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">
              {toolIcons[scan.tool] ?? "🛡️"} {scan.tool}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                scan.status === "FAILED"
                  ? "bg-red-100 text-red-700"
                  : scan.status === "PASSED"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {scan.status}
            </span>

          </div>

          <h2 className="text-2xl font-bold">
            {scan.tool} Scan
          </h2>

          <p className="mt-2 text-slate-500">
            Scan ID: {scan.id}
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl border p-4">
            <p className="text-xs uppercase text-gray-500">
              Started
            </p>

            <p className="mt-2">
              {new Date(scan.startedAt).toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-xs uppercase text-gray-500">
              Finished
            </p>

            <p className="mt-2">
              {scan.finishedAt
                ? new Date(
                    scan.finishedAt,
                  ).toLocaleString()
                : "Running"}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-xs uppercase text-gray-500">
              Duration
            </p>

            <p className="mt-2">
              {duration !== null
                ? `${duration}s`
                : "-"}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-xs uppercase text-gray-500">
              Findings
            </p>

            <p className="mt-2 text-xl font-bold">
              {scan.findings.length}
            </p>
          </div>

        </div>

        {/* Report */}

        {scan.reportPath && (
  <div className="rounded-xl border p-4">
    <p className="text-xs uppercase tracking-wide text-gray-500">
      Report Path
    </p>

    <code className="mt-3 block overflow-x-auto rounded-lg bg-slate-100 p-3 text-xs">
      {scan.reportPath}
    </code>
  </div>
)}

        {/* Findings */}

        <div>

          <div className="mb-4 flex items-center justify-between">

            <h3 className="text-lg font-semibold">
              Findings
            </h3>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
              {scan.findings.length}
            </span>

          </div>

          {scan.findings.length === 0 ? (

            <div className="rounded-xl border p-8 text-center text-slate-500">
              ✅ No findings detected.
            </div>

          ) : (

            <div className="space-y-4">

              {scan.findings.map((finding) => (

                <div
                  key={finding.id}
                  className="rounded-xl border p-5"
                >

                  <div className="mb-3 flex items-center justify-between gap-4">

                    <h4 className="font-semibold break-words">
                      {finding.title}
                    </h4>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        severityColors[
                          finding.severity
                        ] ??
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {finding.severity}
                    </span>

                  </div>

                  <p className="text-sm leading-6 text-slate-600">
                    {finding.description}
                  </p>

                  <div className="mt-4 space-y-2 text-sm">

                    {finding.file && (
  <div>
    <strong>File:</strong>{" "}
    <code className="rounded bg-slate-100 px-2 py-1">
      {finding.file}
    </code>
  </div>
)}

{finding.rule && (
  <div>
    <strong>Rule:</strong>{" "}
    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
      {finding.rule}
    </span>
  </div>
)}

{finding.cve && (
  <div>
    <strong>CVE:</strong>{" "}
    <a
      href={
        finding.cve.startsWith("GHSA-")
          ? `https://github.com/advisories/${finding.cve}`
          : `https://nvd.nist.gov/vuln/detail/${finding.cve}`
      }
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 hover:underline"
    >
      {finding.cve}
    </a>
  </div>
)}

                    {finding.line != null && (
                      <div>
                        <strong>Line:</strong>{" "}
                        {finding.line}
                      </div>
                    )}

                    {finding.recommendation && (
  <div className="rounded-lg border border-green-200 bg-green-50 p-3">
    <p className="font-semibold text-green-700">
      Recommendation
    </p>

    <p className="mt-2 text-sm text-slate-700">
      {finding.recommendation}
    </p>
  </div>
)}


                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Actions */}

<div className="flex gap-3 border-t pt-4">
  <button
    onClick={handleDownload}
    className="rounded-lg border border-slate-300 px-5 py-2 font-medium transition hover:bg-slate-100 active:scale-[0.98]"
  >
    📥 Download Report
  </button>

  <button
    onClick={onClose}
    className="rounded-lg bg-slate-900 px-5 py-2 font-medium text-white transition hover:bg-slate-800"
  >
    Close
  </button>
</div>

      </div>
    </Drawer>
  );
}