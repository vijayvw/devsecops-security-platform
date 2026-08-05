import { useEffect, useState } from "react";
import SecurityCharts from "./SecurityCharts";
import {
  securityApi,
  type SecuritySummary,
} from "../../api/security";

export default function OverviewCards() {
  const [summary, setSummary] =
    useState<SecuritySummary | null>(null);

  useEffect(() => {
    async function loadSummary() {
      try {
        const data =
          await securityApi.getSummary();

        setSummary(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadSummary();

    const interval = setInterval(
      loadSummary,
      5000
    );

    return () => clearInterval(interval);
  }, []);

  if (!summary) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-400">
        Loading security dashboard...
      </div>
    );
  }

  const totalFindings =
    summary.findings.critical +
    summary.findings.high +
    summary.findings.medium +
    summary.findings.low;

  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        ((summary.passed + 1) /
          (summary.totalScans + 1)) *
          100
      )
    )
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-12">

        {/* Security Score */}

        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl lg:col-span-4">
          <p className="text-sm uppercase tracking-widest text-blue-100">
            Security Score
          </p>

          <h2 className="mt-4 text-6xl font-black">
            {score}%
          </h2>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-700"
              style={{
                width: `${score}%`,
              }}
            />
          </div>

          <p className="mt-4 text-blue-100">
            Overall platform health based on
            recent scan results.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">

          <MetricCard
            icon="🛡️"
            title="Scans"
            value={summary.totalScans}
            color="border-blue-500"
          />

          <MetricCard
            icon="✅"
            title="Passed"
            value={summary.passed}
            color="border-green-500"
          />

          <MetricCard
            icon="❌"
            title="Failed"
            value={summary.failed}
            color="border-red-500"
          />

          <MetricCard
            icon="🏃"
            title="Running"
            value={summary.running}
            color="border-cyan-500"
          />

        </div>

      </div>

      {/* Findings */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <SeverityCard
          title="Critical"
          value={summary.findings.critical}
          color="bg-red-600"
          icon="🚨"
        />

        <SeverityCard
          title="High"
          value={summary.findings.high}
          color="bg-orange-500"
          icon="⚠️"
        />

        <SeverityCard
          title="Medium"
          value={summary.findings.medium}
          color="bg-yellow-500"
          icon="🟡"
        />

        <SeverityCard
          title="Low"
          value={summary.findings.low}
          color="bg-green-500"
          icon="🟢"
        />

      </div>

      {/* Summary */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-6 text-xl font-bold text-white">
            Platform Summary
          </h3>

          <div className="space-y-4">

            <Row
              label="Pending Scans"
              value={summary.pending}
            />

            <Row
              label="Running Scans"
              value={summary.running}
            />

            <Row
              label="Total Findings"
              value={totalFindings}
            />

            <Row
              label="Successful Scans"
              value={summary.passed}
            />

          </div>
        </div>

        <SecurityCharts summary={summary} />

      </div>
    </div>
  );
}

function MetricCard({
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
    <div
      className={`rounded-2xl border-l-4 ${color} border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>

        <div className="text-right">
          <div className="text-3xl font-bold text-white">
            {value}
          </div>

          <div className="text-sm text-slate-400">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}

function SeverityCard({
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
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div>
          <div className="text-sm text-slate-400">
            {title}
          </div>

          <div className="mt-2 text-4xl font-bold text-white">
            {value}
          </div>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${color} text-2xl`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-800 px-4 py-3">
      <span className="text-slate-400">
        {label}
      </span>

      <span className="text-lg font-bold text-white">
        {value}
      </span>
    </div>
  );
}