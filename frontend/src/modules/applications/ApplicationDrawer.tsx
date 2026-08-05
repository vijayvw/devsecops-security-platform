import { useEffect, useState } from "react";
import Drawer from "../../components/Drawer";

import {
  applicationsApi,
  type Application,
} from "../../api/applications";

interface Props {
  application: Application | null;
  onClose: () => void;
}

export default function ApplicationDrawer({
  application,
  onClose,
}: Props) {
  const [form, setForm] =
    useState<Partial<Application>>({});

  useEffect(() => {
    if (application) {
      setForm(application);
    }
  }, [application]);

  const handleChange = (
    field: keyof Application,
    value: any
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function handleSave() {
    if (!application) return;

    try {
      await applicationsApi.update(
        application.id,
        form
      );

      alert("Application updated successfully.");

      onClose();

      window.location.reload();
    } catch (err) {
      console.error(err);

      alert("Failed to update application.");
    }
  }

  async function handleArchive() {
    if (!application) return;

    if (!confirm("Archive this repository?")) {
      return;
    }

    try {
      await applicationsApi.remove(
        application.id
      );

      alert("Repository archived.");

      onClose();

      window.location.reload();
    } catch (err) {
      console.error(err);

      alert("Failed to archive repository.");
    }
  }

  return (
    <Drawer
      open={application !== null}
      onClose={onClose}
      title="Application Overview"
    >
      {application && (
        <div className="space-y-8">

          {/* Hero */}

          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-7 text-white shadow-xl">

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-5">

                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-5xl shadow-lg">
                  🐙
                </div>

                <div>

                  <h2 className="text-3xl font-bold">
                    {form.name}
                  </h2>

                  <p className="mt-2 text-slate-300">
                    {form.repositoryOwner}/
                    {form.repositoryName}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">

                    <span className="rounded-full bg-slate-700 px-3 py-1 text-sm">
                      🌿 {form.defaultBranch}
                    </span>

                    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm">
                      {form.language}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        form.isPrivate
                          ? "bg-red-600"
                          : "bg-green-600"
                      }`}
                    >
                      {form.isPrivate
                        ? "🔒 Private"
                        : "🌍 Public"}
                    </span>

                  </div>

                </div>

              </div>

              <div className="rounded-2xl bg-green-600 px-5 py-3 text-center shadow-lg">

                <div className="text-xs uppercase tracking-wider">
                  Status
                </div>

                <div className="mt-2 text-xl font-bold">
                  🟢 Healthy
                </div>

              </div>

            </div>

          </div>

          {/* Dashboard */}

          <div className="grid gap-4 md:grid-cols-4">

            <OverviewCard
              title="Security Score"
              value="96%"
              color="text-green-600"
              icon="🛡"
            />

            <OverviewCard
              title="Pipelines"
              value="12"
              color="text-blue-600"
              icon="🚀"
            />

            <OverviewCard
              title="Scans"
              value="74"
              color="text-orange-600"
              icon="🔍"
            />

            <OverviewCard
              title="Critical"
              value="0"
              color="text-red-600"
              icon="🚨"
            />

          </div>

          {/* Repository Overview */}

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <h3 className="text-xl font-bold">
              Repository Overview
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <InfoCard
                label="Owner"
                value={
                  form.repositoryOwner ??
                  "-"
                }
              />

              <InfoCard
                label="Repository"
                value={
                  form.repositoryName ??
                  "-"
                }
              />

              <InfoCard
                label="Language"
                value={
                  form.language ??
                  "-"
                }
              />

              <InfoCard
                label="Default Branch"
                value={
                  form.defaultBranch ??
                  "-"
                }
              />

              <InfoCard
                label="Visibility"
                value={
                  form.isPrivate
                    ? "Private"
                    : "Public"
                }
              />

              <InfoCard
                label="Repository URL"
                value={
                  form.repositoryUrl ??
                  "-"
                }
              />

            </div>

          </div>
                    {/* Kubernetes */}

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <h3 className="text-xl font-bold">
              Kubernetes Deployment
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <InfoCard
                label="Cluster"
                value="Production Cluster"
              />

              <InfoCard
                label="Namespace"
                value="production"
              />

              <InfoCard
                label="Deployment"
                value={form.name ?? "-"}
              />

              <InfoCard
                label="Container Image"
                value={`${form.repositoryName ?? "app"}:latest`}
              />

              <InfoCard
                label="Replicas"
                value="3 Running"
              />

              <InfoCard
                label="Ingress"
                value="Configured"
              />

            </div>

          </div>

          {/* Quick Actions */}

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <h3 className="text-xl font-bold">
              Quick Actions
            </h3>

            <div className="mt-6 grid gap-4 md:grid-cols-3">

              <button className="rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700">
                🚀 Run Pipeline
              </button>

              <button className="rounded-2xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700">
                🛡 Run Security Scan
              </button>

              <button
                onClick={() => {
                  if (form.repositoryUrl) {
                    window.open(
                      form.repositoryUrl,
                      "_blank"
                    );
                  }
                }}
                className="rounded-2xl border border-slate-300 px-6 py-4 font-semibold transition hover:bg-slate-100"
              >
                🐙 Open Repository
              </button>

            </div>

          </div>

          {/* Recent Activity */}

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <h3 className="text-xl font-bold">
              Recent Activity
            </h3>

            <div className="mt-6 space-y-5">

              <ActivityItem
                icon="🚀"
                title="Pipeline completed successfully"
                subtitle="2 minutes ago"
                color="bg-green-500"
              />

              <ActivityItem
                icon="🛡"
                title="Security scan finished"
                subtitle="5 minutes ago"
                color="bg-blue-500"
              />

              <ActivityItem
                icon="☸️"
                title="Deployment updated"
                subtitle="12 minutes ago"
                color="bg-violet-500"
              />

              <ActivityItem
                icon="🐙"
                title="Repository synchronized"
                subtitle="25 minutes ago"
                color="bg-slate-600"
              />

            </div>

          </div>

          {/* Repository Settings */}

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <h3 className="text-xl font-bold">
              Repository Settings
            </h3>

            <div className="mt-6 space-y-6">

              <div>

                <label className="mb-2 block font-medium">
                  Application Name
                </label>

                <input
                  className="w-full rounded-xl border px-4 py-3"
                  value={form.name ?? ""}
                  onChange={(e) =>
                    handleChange(
                      "name",
                      e.target.value
                    )
                  }
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Description
                </label>

                <textarea
                  rows={4}
                  className="w-full rounded-xl border px-4 py-3"
                  value={form.description ?? ""}
                  onChange={(e) =>
                    handleChange(
                      "description",
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block font-medium">
                    Repository Owner
                  </label>

                  <input
                    className="w-full rounded-xl border px-4 py-3"
                    value={
                      form.repositoryOwner ?? ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "repositoryOwner",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div>

                  <label className="mb-2 block font-medium">
                    Repository Name
                  </label>

                  <input
                    className="w-full rounded-xl border px-4 py-3"
                    value={
                      form.repositoryName ?? ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "repositoryName",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>
                            <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block font-medium">
                    Language
                  </label>

                  <input
                    className="w-full rounded-xl border px-4 py-3"
                    value={form.language ?? ""}
                    onChange={(e) =>
                      handleChange(
                        "language",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div>

                  <label className="mb-2 block font-medium">
                    Default Branch
                  </label>

                  <select
                    className="w-full rounded-xl border px-4 py-3"
                    value={form.defaultBranch ?? "main"}
                    onChange={(e) =>
                      handleChange(
                        "defaultBranch",
                        e.target.value
                      )
                    }
                  >
                    <option value="main">main</option>
                    <option value="develop">develop</option>
                    <option value="dev">dev</option>
                    <option value="release">release</option>
                    <option value="staging">staging</option>
                  </select>

                </div>

              </div>

            </div>

          </div>

          {/* Scan Configuration */}

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <h3 className="text-xl font-bold">
              Scan Configuration
            </h3>

            <div className="mt-6 grid gap-5">

              <ToggleRow
                title="Scan on Push"
                checked={form.scanOnPush ?? false}
                onChange={(v) =>
                  handleChange("scanOnPush", v)
                }
              />

              <ToggleRow
                title="Scan on Pull Request"
                checked={form.scanOnPullRequest ?? false}
                onChange={(v) =>
                  handleChange(
                    "scanOnPullRequest",
                    v
                  )
                }
              />

              <ToggleRow
                title="Auto Fix"
                checked={form.autoFixEnabled ?? false}
                onChange={(v) =>
                  handleChange(
                    "autoFixEnabled",
                    v
                  )
                }
              />

              <ToggleRow
                title="Secrets Scan (Gitleaks)"
                checked={form.scanSecrets ?? false}
                onChange={(v) =>
                  handleChange(
                    "scanSecrets",
                    v
                  )
                }
              />

              <ToggleRow
                title="SAST (Semgrep)"
                checked={form.scanSast ?? false}
                onChange={(v) =>
                  handleChange(
                    "scanSast",
                    v
                  )
                }
              />

              <ToggleRow
                title="Dependency Scan"
                checked={
                  form.scanDependencies ??
                  false
                }
                onChange={(v) =>
                  handleChange(
                    "scanDependencies",
                    v
                  )
                }
              />

              <ToggleRow
                title="IaC Scan (Checkov)"
                checked={form.scanIac ?? false}
                onChange={(v) =>
                  handleChange(
                    "scanIac",
                    v
                  )
                }
              />

              <ToggleRow
                title="Container Scan (Trivy)"
                checked={
                  form.scanContainers ??
                  false
                }
                onChange={(v) =>
                  handleChange(
                    "scanContainers",
                    v
                  )
                }
              />

            </div>

          </div>

          {/* GitHub */}

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold">
                  GitHub Webhook
                </h3>

                <p className="mt-1 text-slate-500">
                  Automatically trigger scans
                  whenever code is pushed.
                </p>

              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  form.webhookEnabled
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {form.webhookEnabled
                  ? "Configured"
                  : "Not Configured"}
              </span>

            </div>

            <button className="mt-6 w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800">
              Configure GitHub Webhook
            </button>

          </div>

          {/* Actions */}

          <div className="flex justify-end gap-4 border-t pt-6">

            <button
              onClick={onClose}
              className="rounded-xl border px-6 py-3 font-medium hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Save Changes
            </button>

            <button
              onClick={handleArchive}
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              Archive Repository
            </button>

          </div>

        </div>
      )}
    </Drawer>
  );
}
function OverviewCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <div className="text-xs uppercase tracking-wider text-slate-500">
            {title}
          </div>

          <div className="mt-3 text-xl font-bold text-slate-900">
            {value}
          </div>

        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl text-white ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </div>

      <div className="mt-3 break-all text-base font-semibold text-slate-900">
        {value}
      </div>

    </div>
  );
}

function ActivityItem({
  icon,
  title,
  subtitle,
  color = "bg-slate-100",
}: {
  icon: string;
  title: string;
  subtitle: string;
  color?: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border p-4">

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl text-white ${color}`}
      >
        {icon}
      </div>

      <div className="flex-1">

        <div className="font-semibold text-slate-900">
          {title}
        </div>

        <div className="mt-1 text-sm text-slate-500">
          {subtitle}
        </div>

      </div>

    </div>
  );
}

function ToggleRow({
  title,
  checked,
  onChange,
}: {
  title: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-2xl border p-4 cursor-pointer hover:bg-slate-50">

      <span className="font-medium text-slate-800">
        {title}
      </span>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative flex h-7 w-12 items-center rounded-full transition ${
          checked
            ? "bg-blue-600"
            : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute h-5 w-5 rounded-full bg-white shadow transition ${
            checked
              ? "translate-x-6"
              : "translate-x-1"
          }`}
        />
      </button>

    </label>
  );
}