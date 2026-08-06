import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  securityFindingsApi,
  type Finding,
} from "../../api/security-findings";

const badgeColors: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-700",
  HIGH: "bg-orange-100 text-orange-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-green-100 text-green-700",
  INFO: "bg-blue-100 text-blue-700",
};

export default function LatestSecurityFindings() {
  const [findings, setFindings] = useState<Finding[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await securityFindingsApi.getAll();

        // Load everything so the card can scroll
        setFindings(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return (
    <div className="flex h-[800px] w-full flex-col rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 p-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Latest Security Findings
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Highest priority vulnerabilities
          </p>
        </div>

        <Link
          to="/findings"
          className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          View All →
        </Link>

      </div>

      {/* Scrollable Body */}

      <div className="flex-1 overflow-y-auto">

        {findings.map((finding) => (

          <div
            key={finding.id}
            className="border-b border-slate-800 px-6 py-4 transition hover:bg-slate-800/40 last:border-none"
          >

            <div className="flex items-center justify-between">

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${badgeColors[finding.severity]}`}
              >
                {finding.severity}
              </span>

              <span className="text-xs uppercase tracking-wide text-slate-400">
                {finding.tool}
              </span>

            </div>

            <h3 className="mt-3 line-clamp-2 font-semibold text-white">
              {finding.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
              {finding.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}