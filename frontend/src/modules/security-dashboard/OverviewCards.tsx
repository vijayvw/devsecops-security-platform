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
      } catch (error) {
        console.error(error);
      }
    }

    loadSummary();

    const interval = setInterval(
      loadSummary,
      1000
    );

    return () =>
      clearInterval(interval);
  }, []);

  if (!summary) {
    return (
      <p className="text-gray-500">
        Loading dashboard...
      </p>
    );
  }

  return (
  <>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card
        title="Total Scans"
        value={summary.totalScans}
        color="bg-blue-500"
      />

      <Card
        title="Running"
        value={summary.running}
        color="bg-cyan-500"
      />

      <Card
        title="Passed"
        value={summary.passed}
        color="bg-green-500"
      />

      <Card
        title="Failed"
        value={summary.failed}
        color="bg-red-500"
      />

      <Card
        title="Pending"
        value={summary.pending}
        color="bg-yellow-500"
      />

      <Card
        title="Critical"
        value={summary.findings.critical}
        color="bg-red-700"
      />

      <Card
        title="High"
        value={summary.findings.high}
        color="bg-orange-500"
      />

      <Card
        title="Medium"
        value={summary.findings.medium}
        color="bg-amber-500"
      />

      <Card
        title="Low"
        value={summary.findings.low}
        color="bg-green-600"
      />
    </div>

    <SecurityCharts summary={summary} />
  </>
);
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">
          {title}
        </h3>

        <div
          className={`h-3 w-3 rounded-full ${color}`}
        />
      </div>

      <div className="mt-4 text-4xl font-bold text-slate-800">
        {value}
      </div>
    </div>
  );
}