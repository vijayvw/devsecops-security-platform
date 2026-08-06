import { useEffect, useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  LoaderCircle,
  ShieldAlert,
  AlertTriangle,
  CircleDot,
  TrendingUp,
} from "lucide-react";

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
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-16 text-center">

        <LoaderCircle
          size={42}
          className="mx-auto animate-spin text-blue-500"
        />

        <p className="mt-6 text-lg text-slate-400">
          Loading security dashboard...
        </p>

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

  const securityLevel =
    score >= 90
      ? "Excellent"
      : score >= 75
      ? "Good"
      : score >= 50
      ? "Moderate"
      : "Critical";

  return (
    <div className="space-y-8">

      {/* ===================================================== */}
      {/* Security Overview */}
      {/* ===================================================== */}

      <div className="grid gap-6 xl:grid-cols-12">

        {/* Score */}

        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl xl:col-span-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm uppercase tracking-[0.3em] text-blue-100">

                Security Score

              </p>

              <h2 className="mt-4 text-7xl font-black">

                {score}%

              </h2>

            </div>

            <ShieldCheck size={70} />

          </div>

          <div className="mt-8 h-4 overflow-hidden rounded-full bg-white/20">

            <div
              className="h-full rounded-full bg-white transition-all duration-1000"
              style={{
                width: `${score}%`,
              }}
            />

          </div>

          <div className="mt-6 flex items-center justify-between">

            <div>

              <div className="text-2xl font-bold">

                {securityLevel}

              </div>

              <div className="text-sm text-blue-100">

                Overall platform security posture

              </div>

            </div>

            <div className="rounded-2xl bg-white/10 px-4 py-3 text-right backdrop-blur">

              <div className="text-xs uppercase tracking-widest text-blue-100">

                Updated

              </div>

              <div className="mt-1 font-semibold">

                Live

              </div>

            </div>

          </div>

        </div>

        {/* Metrics */}

        <div className="grid gap-5 sm:grid-cols-2 xl:col-span-8 xl:grid-cols-4">

          <MetricCard
            title="Security Scans"
            value={summary.totalScans}
            subtitle="+12 Today"
            color="blue"
            icon={
              <ShieldCheck size={28} />
            }
          />

          <MetricCard
            title="Passed"
            value={summary.passed}
            subtitle="Healthy"
            color="green"
            icon={
              <CheckCircle2 size={28} />
            }
          />

          <MetricCard
            title="Failed"
            value={summary.failed}
            subtitle="Needs Review"
            color="red"
            icon={
              <XCircle size={28} />
            }
          />

          <MetricCard
            title="Running"
            value={summary.running}
            subtitle="Live"
            color="cyan"
            icon={
              <LoaderCircle size={28} />
            }
          />

        </div>

      </div>

      {/* ===================================================== */}
      {/* Severity */}
      {/* ===================================================== */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <SeverityCard
          title="Critical"
          value={summary.findings.critical}
          subtitle="Immediate Action"
          color="red"
          icon={
            <ShieldAlert size={30} />
          }
        />

        <SeverityCard
          title="High"
          value={summary.findings.high}
          subtitle="High Priority"
          color="orange"
          icon={
            <AlertTriangle size={30} />
          }
        />

        <SeverityCard
          title="Medium"
          value={summary.findings.medium}
          subtitle="Needs Review"
          color="yellow"
          icon={
            <TrendingUp size={30} />
          }
        />

        <SeverityCard
          title="Low"
          value={summary.findings.low}
          subtitle="Monitor"
          color="green"
          icon={
            <CircleDot size={30} />
          }
        />

      </div>

      {/* ===================================================== */}
      {/* Summary + Charts */}
      {/* ===================================================== */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-xl">

          <h3 className="text-2xl font-bold text-white">

            Platform Summary

          </h3>

          <p className="mt-2 text-slate-400">

            Live overview of current security posture.

          </p>

          <div className="mt-8 space-y-4">

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
}function MetricCard({
  title,
  value,
  subtitle,
  color,
  icon,
}: {
  title: string;
  value: number;
  subtitle: string;
  color: "blue" | "green" | "red" | "cyan";
  icon: React.ReactNode;
}) {
  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    cyan: "bg-cyan-600",
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-500/20">

      <div className="flex items-start justify-between">

        <div>

          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
            {title}
          </div>

          <div className="mt-4 text-4xl font-bold text-white">
            {value}
          </div>

          <div className="mt-2 text-sm text-slate-400">
            {subtitle}
          </div>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white ${colors[color]}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

function SeverityCard({
  title,
  value,
  subtitle,
  color,
  icon,
}: {
  title: string;
  value: number;
  subtitle: string;
  color: "red" | "orange" | "yellow" | "green";
  icon: React.ReactNode;
}) {
  const colors = {
    red: "bg-red-600",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    green: "bg-green-600",
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-500/20">

      <div className="flex items-center justify-between">

        <div>

          <div className="text-sm uppercase tracking-wider text-slate-400">
            {title}
          </div>

          <div className="mt-3 text-5xl font-black text-white">
            {value}
          </div>

          <div className="mt-2 text-sm text-slate-500">
            {subtitle}
          </div>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white ${colors[color]}`}
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
    <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 transition hover:bg-slate-700">

      <div>

        <div className="text-sm text-slate-400">
          {label}
        </div>

      </div>

      <div className="text-2xl font-bold text-white">
        {value}
      </div>

    </div>
  );
}