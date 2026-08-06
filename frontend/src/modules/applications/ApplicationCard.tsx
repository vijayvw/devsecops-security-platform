import type { Application } from "../../api/applications";

import {
  FolderGit2,
  Lock,
  Globe,
  GitBranch,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Clock3,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Boxes,
} from "lucide-react";

interface Props {
  application: Application;
  onClick: () => void;
}

const languageColors: Record<
  string,
  string
> = {
  TypeScript:
    "bg-blue-500/20 text-blue-300 border border-blue-500/30",

  JavaScript:
    "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",

  Python:
    "bg-green-500/20 text-green-300 border border-green-500/30",

  Go:
    "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",

  Java:
    "bg-orange-500/20 text-orange-300 border border-orange-500/30",

  Rust:
    "bg-orange-600/20 text-orange-300 border border-orange-600/30",

  Terraform:
    "bg-violet-500/20 text-violet-300 border border-violet-500/30",

  Unknown:
    "bg-slate-700 text-slate-300 border border-slate-600",
};

export default function ApplicationCard({
  application,
  onClick,
}: Props) {
  const language =
    application.language || "Unknown";

  return (
    <button
      onClick={onClick}
      className="group w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 text-left shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_25px_70px_rgba(59,130,246,.22)]"
    >

      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div className="border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-7">

        <div className="flex items-start justify-between">

          <div className="flex items-start gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl">

              <FolderGit2
                size={30}
                className="text-white"
              />

            </div>

            <div>

              <h3 className="text-2xl font-bold text-white transition group-hover:text-blue-400">

                {application.name}

              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">

                  <GitBranch size={15} />

                  {application.repositoryOwner}/
                  {application.repositoryName}

                </div>

                <div className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">

                  <GitBranch size={15} />

                  {application.defaultBranch}

                </div>

              </div>

            </div>

          </div>

          <div className="flex flex-col gap-3">

            <div
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                application.isPrivate
                  ? "bg-red-500/20 text-red-300"
                  : "bg-emerald-500/20 text-emerald-300"
              }`}
            >

              {application.isPrivate ? (
                <Lock size={16} />
              ) : (
                <Globe size={16} />
              )}

              {application.isPrivate
                ? "Private"
                : "Public"}

            </div>

            <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-300">

              <Activity size={16} />

              Healthy

            </div>

          </div>

        </div>

      </div>

      {/* ====================================== */}
      {/* Body */}
      {/* ====================================== */}

      <div className="space-y-7 p-7">

        <p className="min-h-[72px] text-[15px] leading-7 text-slate-400">

          {application.description ||
            "No description available for this repository."}

        </p>

        <div className="grid grid-cols-2 gap-4">

          <InfoCard title="Language">

            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                languageColors[language] ??
                languageColors.Unknown
              }`}
            >
              {language}
            </span>

          </InfoCard>

          <InfoCard title="Webhook">

            <div className="flex items-center gap-2">

              {application.webhookEnabled ? (
                <>
                  <CheckCircle2
                    size={18}
                    className="text-green-400"
                  />

                  <span className="font-semibold text-green-300">

                    Connected

                  </span>
                </>
              ) : (
                <>
                  <ShieldAlert
                    size={18}
                    className="text-red-400"
                  />

                  <span className="font-semibold text-red-300">

                    Disabled

                  </span>
                </>
              )}

            </div>

          </InfoCard>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

          <div className="mb-4 flex items-center gap-3">

            <ShieldCheck
              size={20}
              className="text-blue-400"
            />

            <h4 className="text-lg font-semibold text-white">

              Security Capabilities

            </h4>

          </div>

          <div className="grid grid-cols-2 gap-3">

            <Capability
              enabled={application.scanSecrets}
              title="Secrets Scan"
            />

            <Capability
              enabled={application.scanSast}
              title="SAST"
            />

            <Capability
              enabled={application.scanDependencies}
              title="Dependencies"
            />

            <Capability
              enabled={application.scanContainers}
              title="Containers"
            />

            <Capability
              enabled={application.scanIac}
              title="IaC Scan"
            />

            <Capability
              enabled={application.autoFixEnabled}
              title="Auto Fix"
            />

          </div>

        </div>

        <div className="grid grid-cols-3 gap-4">

          <StatCard
            icon={<PlayCircle size={18} />}
            title="Pipeline"
            value={
              application.scanOnPush
                ? "Auto"
                : "Manual"
            }
          />

          <StatCard
            icon={<ShieldCheck size={18} />}
            title="Security"
            value="Healthy"
          />

          <StatCard
            icon={<Boxes size={18} />}
            title="Status"
            value={
              application.isArchived
                ? "Archived"
                : "Active"
            }
          />

        </div>
                <div className="grid grid-cols-2 gap-4">

          <MiniInfo
            icon={<Clock3 size={16} />}
            label="Last Updated"
            value={new Date(
              application.updatedAt
            ).toLocaleDateString()}
          />

          <MiniInfo
            icon={<CalendarDays size={16} />}
            label="Created"
            value={new Date(
              application.createdAt
            ).toLocaleDateString()}
          />

        </div>

      </div>

      {/* ====================================== */}
      {/* Footer */}
      {/* ====================================== */}

      <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-7 py-5">

        <div className="flex items-center gap-3">

          <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

          <span className="text-sm text-slate-400">

            Repository monitored continuously

          </span>

        </div>

        <div className="flex items-center gap-2 font-semibold text-blue-400 transition duration-300 group-hover:translate-x-1">

          View Details

          <ArrowRight size={18} />

        </div>

      </div>

    </button>
  );
}

/* ===================================================== */
/* Helper Components */
/* ===================================================== */

function Capability({
  enabled,
  title,
}: {
  enabled: boolean;
  title: string;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border px-4 py-3 transition ${
        enabled
          ? "border-green-500/30 bg-green-500/10"
          : "border-slate-700 bg-slate-800"
      }`}
    >

      <span className="text-sm font-medium text-white">

        {title}

      </span>

      {enabled ? (

        <CheckCircle2
          size={18}
          className="text-green-400"
        />

      ) : (

        <ShieldAlert
          size={18}
          className="text-slate-500"
        />

      )}

    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">

        {title}

      </div>

      <div className="mt-4">

        {children}

      </div>

    </div>
  );
}

function MiniInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-center gap-2 text-slate-400">

        {icon}

        <span className="text-xs uppercase tracking-[0.25em]">

          {label}

        </span>

      </div>

      <div className="mt-3 text-base font-semibold text-white">

        {value}

      </div>

    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-blue-500">

      <div className="flex items-center justify-between">

        <div className="text-blue-400">

          {icon}

        </div>

        <div className="text-right">

          <div className="text-xs uppercase tracking-[0.25em] text-slate-500">

            {title}

          </div>

          <div className="mt-2 text-lg font-bold text-white">

            {value}

          </div>

        </div>

      </div>

    </div>
  );
}

