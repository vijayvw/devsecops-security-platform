import { useEffect, useMemo, useState } from "react";
import Drawer from "../../components/Drawer";
import {
  securityFindingsApi,
  type Finding,
} from "../../api/security-findings";

const badgeColors: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-700",
  HIGH: "bg-orange-100 text-orange-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-green-100 text-green-700",
};

export default function SecurityFindingsTable() {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [search, setSearch] = useState("");
  const [selectedFinding, setSelectedFinding] =
    useState<Finding | null>(null);
  const [severityFilter, setSeverityFilter] =
  

  useState("ALL");  

  useEffect(() => {
    securityFindingsApi
      .getAll()
      .then(setFindings)
      .catch(console.error);
  }, []);

  const filteredFindings = useMemo(() => {
  return findings.filter((finding) => {
    const matchesSearch =
      finding.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (finding.file ?? "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesSeverity =
      severityFilter === "ALL" ||
      finding.severity === severityFilter;

    return matchesSearch && matchesSeverity;
  });
}, [findings, search, severityFilter]);

  return (
  <>
    <div className="rounded-xl border bg-white shadow">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Recent Security Findings
        </h2>
        <div className="space-y-4 border-b p-4">
  <input
    type="text"
    placeholder="Search findings..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-lg border p-2"
  />

  <div className="flex gap-2 flex-wrap">
    {[
      "ALL",
      "CRITICAL",
      "HIGH",
      "MEDIUM",
      "LOW",
    ].map((level) => (
      <button
        key={level}
        onClick={() => setSeverityFilter(level)}
        className={`rounded-full px-3 py-1 text-sm ${
          severityFilter === level
            ? "bg-slate-900 text-white"
            : "bg-gray-100"
        }`}
      >
        {level}
      </button>
    ))}
  </div>
</div>
      </div>

      {filteredFindings.length === 0 ? (
        <div className="p-6 text-gray-500">
          No findings detected.
        </div>
      ) : (
        <div className="divide-y">
          {filteredFindings.map((finding) => (
            <div
             key={finding.id}
             onClick={() => setSelectedFinding(finding)}
             className="flex cursor-pointer items-center justify-between p-4 transition hover:bg-slate-50"
            >
              <div>
                <p className="font-medium">
                  {finding.title}
                </p>

                <p className="text-sm text-gray-500">
                  {finding.file ?? "-"}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  badgeColors[finding.severity] ??
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {finding.severity}
              </span>
            </div>
          ))}
        </div>
      )}
        </div>

    <Drawer
      open={selectedFinding !== null}
      onClose={() => setSelectedFinding(null)}
      title="Security Finding"
    >
      {selectedFinding && (
       <div className="space-y-6">

  <div>
    <h3 className="text-2xl font-bold">
      {selectedFinding.title}
    </h3>
  </div>

  <div className="grid grid-cols-2 gap-4">

    <div className="rounded-lg border p-4">
      <p className="text-xs uppercase text-gray-500">
        Severity
      </p>

      <span
        className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
          badgeColors[selectedFinding.severity]
        }`}
      >
        {selectedFinding.severity}
      </span>
    </div>

    <div className="rounded-lg border p-4">
      <p className="text-xs uppercase text-gray-500">
        Rule
      </p>

      <p className="mt-2 font-medium">
        {selectedFinding.rule}
      </p>
    </div>

  </div>

  <div className="rounded-lg border p-4">
    <p className="text-xs uppercase text-gray-500">
      File
    </p>

    <code className="mt-2 block text-sm">
      {selectedFinding.file}
    </code>
  </div>

  <div className="rounded-lg border p-4">
    <p className="text-xs uppercase text-gray-500">
      Description
    </p>

    <p className="mt-2">
      {selectedFinding.description}
    </p>
  </div>

</div>
      )}
    </Drawer>
  </>
);
}