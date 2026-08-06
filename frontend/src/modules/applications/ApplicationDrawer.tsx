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

<div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl">

  <div className="relative p-8">

   

    {/* Top */}

    <div className="flex flex-col justify-between gap-8 xl:flex-row">

      {/* Left */}

      <div className="flex items-start gap-6">

        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 text-5xl shadow-xl">

          🐙

        </div>

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <h2 className="text-4xl font-bold text-white">

              {form.name}

            </h2>

            <span
              className={`rounded-full px-4 py-1 text-sm font-semibold ${
                form.isPrivate
                  ? "bg-red-500/20 text-red-300"
                  : "bg-green-500/20 text-green-300"
              }`}
            >
              {form.isPrivate ? "Private Repository" : "Public Repository"}
            </span>

          </div>

          <p className="mt-3 text-lg text-slate-300">

            {form.repositoryOwner}/{form.repositoryName}

          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">

              🌿 {form.defaultBranch}

            </span>

            <span className="rounded-xl bg-blue-600/30 px-4 py-2 text-sm">

              {form.language}

            </span>

            <span className="rounded-xl bg-emerald-600/30 px-4 py-2 text-sm">

              Kubernetes Ready

            </span>

            <span className="rounded-xl bg-violet-600/30 px-4 py-2 text-sm">

              DevSecOps Enabled

            </span>

          </div>

        </div>

      </div>
      

      {/* Right */}

      <div className="grid grid-cols-2 gap-4 xl:w-[360px]">

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

          <div className="text-sm text-slate-300">

            Security Score

          </div>

          <div className="mt-3 text-4xl font-bold text-green-400">

            96%

          </div>

        </div>

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

          <div className="text-sm text-slate-300">

            Findings

          </div>

          <div className="mt-3 text-4xl font-bold text-white">

            3

          </div>

        </div>

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

          <div className="text-sm text-slate-300">

            Pipelines

          </div>

          <div className="mt-3 text-4xl font-bold text-cyan-400">

            12

          </div>

        </div>

        <div className="rounded-2xl bg-emerald-600 p-5">

          <div className="text-sm">

            Status

          </div>

          <div className="mt-3 text-2xl font-bold">

            Healthy

          </div>

        </div>

      </div>

    </div>

  </div>

</div>
 {/* Pipeline Overview */}

<div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

  <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

    <div>

      <h3 className="text-2xl font-bold text-slate-900">
        Latest Pipeline
      </h3>

      <p className="mt-2 text-slate-500">
        Current CI/CD execution status
      </p>

    </div>

    <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
      SUCCESS
    </span>

  </div>

  <div className="grid gap-6 p-8 lg:grid-cols-4">

    <PipelineMetric
      title="Pipeline"
      value="#241"
      color="text-blue-600"
    />

    <PipelineMetric
      title="Duration"
      value="3m 41s"
      color="text-green-600"
    />

    <PipelineMetric
      title="Branch"
      value="main"
      color="text-violet-600"
    />

    <PipelineMetric
      title="Commit"
      value="af39d21"
      color="text-orange-600"
    />

  </div>

  <div className="border-t border-slate-200 p-8">

    <PipelineStage
      name="Checkout"
      complete
    />

    <PipelineStage
      name="Build"
      complete
    />

    <PipelineStage
      name="Unit Tests"
      complete
    />

    <PipelineStage
      name="Security Scan"
      complete
    />

    <PipelineStage
      name="Deploy"
      complete
    />

  </div>

</div>

          {/* Platform Overview */}

<div className="grid gap-6 lg:grid-cols-4">

  <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">

    <div className="flex items-center justify-between">

      <div>

        <div className="text-sm text-slate-500">
          Security Score
        </div>

        <div className="mt-2 text-5xl font-black text-emerald-600">
          96%
        </div>

      </div>

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-3xl text-white">
        🛡
      </div>

    </div>

    <div className="mt-6 h-3 overflow-hidden rounded-full bg-emerald-100">

      <div
        className="h-full rounded-full bg-emerald-500"
        style={{ width: "96%" }}
      />

    </div>

    <p className="mt-3 text-sm text-slate-500">
      Excellent repository security posture.
    </p>

  </div>

  <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">

    <div className="flex items-center justify-between">

      <div>

        <div className="text-sm text-slate-500">
          CI/CD Pipelines
        </div>

        <div className="mt-2 text-5xl font-black text-blue-600">
          12
        </div>

      </div>

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl text-white">
        🚀
      </div>

    </div>

    <div className="mt-5 text-sm text-slate-500">
      Last execution:
    </div>

    <div className="mt-2 font-semibold text-slate-900">
      2 minutes ago
    </div>

  </div>

  <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm">

    <div className="flex items-center justify-between">

      <div>

        <div className="text-sm text-slate-500">
          Security Scans
        </div>

        <div className="mt-2 text-5xl font-black text-orange-500">
          74
        </div>

      </div>

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-3xl text-white">
        🔍
      </div>

    </div>

    <div className="mt-5 text-sm text-slate-500">
      Last completed:
    </div>

    <div className="mt-2 font-semibold text-slate-900">
      5 minutes ago
    </div>

  </div>

  <div className="rounded-3xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-6 shadow-sm">

    <div className="flex items-center justify-between">

      <div>

        <div className="text-sm text-slate-500">
          Critical Findings
        </div>

        <div className="mt-2 text-5xl font-black text-red-600">
          0
        </div>

      </div>

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500 text-3xl text-white">
        🚨
      </div>

    </div>

    <div className="mt-5 rounded-xl bg-green-100 px-4 py-3 text-center">

      <div className="font-semibold text-green-700">
        No Critical Vulnerabilities
      </div>

    </div>

  </div>

</div>

          {/* Repository Overview */}

<div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

  {/* Header */}

  <div className="border-b border-slate-200 px-8 py-6">

    <h3 className="text-2xl font-bold text-slate-900">
      Repository Overview
    </h3>

    <p className="mt-2 text-slate-500">
      Source code repository connected to the DevSecOps platform.
    </p>

  </div>

  {/* Content */}

  <div className="grid gap-6 p-8 lg:grid-cols-2">

    <RepositoryInfo
      title="Repository Owner"
      value={form.repositoryOwner ?? "-"}
      icon="👤"
    />

    <RepositoryInfo
      title="Repository Name"
      value={form.repositoryName ?? "-"}
      icon="📦"
    />

    <RepositoryInfo
      title="Primary Language"
      value={form.language ?? "-"}
      icon="💻"
    />

    <RepositoryInfo
      title="Default Branch"
      value={form.defaultBranch ?? "-"}
      icon="🌿"
    />

    <RepositoryInfo
      title="Visibility"
      value={form.isPrivate ? "Private Repository" : "Public Repository"}
      icon={form.isPrivate ? "🔒" : "🌍"}
    />

    <RepositoryInfo
      title="Repository URL"
      value={form.repositoryUrl ?? "-"}
      icon="🔗"
    />

  </div>

  {/* Footer */}

  <div className="grid border-t border-slate-200 lg:grid-cols-3">

    <RepositoryStat
      label="Commits Today"
      value="28"
    />

    <RepositoryStat
      label="Open Pull Requests"
      value="4"
    />

    <RepositoryStat
      label="Contributors"
      value="9"
    />

  </div>

</div>

          {/* Kubernetes Deployment */}

<div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

  {/* Header */}

  <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

    <div>

      <h3 className="text-2xl font-bold text-slate-900">
        Kubernetes Deployment
      </h3>

      <p className="mt-2 text-slate-500">
        Current deployment running inside your Kubernetes cluster.
      </p>

    </div>

    <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">

      ● Healthy

    </span>

  </div>

  {/* Cluster Overview */}

  <div className="grid gap-6 p-8 lg:grid-cols-3">

    <KubeCard
      icon="☸️"
      title="Cluster"
      value="Production Cluster"
    />

    <KubeCard
      icon="📂"
      title="Namespace"
      value="production"
    />

    <KubeCard
      icon="🚀"
      title="Deployment"
      value={form.name ?? "-"}
    />

    <KubeCard
      icon="🐳"
      title="Container Image"
      value={`${form.repositoryName ?? "app"}:latest`}
    />

    <KubeCard
      icon="📦"
      title="Replicas"
      value="3 / 3 Running"
    />

    <KubeCard
      icon="🌐"
      title="Ingress"
      value="Configured"
    />

  </div>

  {/* Status Bar */}

  <div className="grid border-t border-slate-200 lg:grid-cols-4">

    <StatusMetric
      title="Pods"
      value="12"
      color="text-blue-600"
    />

    <StatusMetric
      title="CPU"
      value="38%"
      color="text-green-600"
    />

    <StatusMetric
      title="Memory"
      value="1.8 GB"
      color="text-orange-600"
    />

    <StatusMetric
      title="Restarts"
      value="0"
      color="text-emerald-600"
    />

  </div>

</div>
          {/* DevSecOps Actions */}

<div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

  {/* Header */}

  <div className="border-b border-slate-200 px-8 py-6">

    <h3 className="text-2xl font-bold text-slate-900">
      DevSecOps Actions
    </h3>

    <p className="mt-2 text-slate-500">
      Trigger CI/CD workflows, security scans and repository operations.
    </p>

  </div>

  {/* Actions */}

  <div className="grid gap-5 p-8 lg:grid-cols-2">

    <ActionButton
      color="from-blue-600 to-cyan-500"
      icon="🚀"
      title="Run Pipeline"
      subtitle="Execute the latest CI/CD pipeline."
    />

    <ActionButton
      color="from-green-600 to-emerald-500"
      icon="🛡"
      title="Run Security Scan"
      subtitle="Launch SAST, Dependency & Secret scans."
    />

    <ActionButton
      color="from-violet-600 to-fuchsia-500"
      icon="☸️"
      title="Deploy to Kubernetes"
      subtitle="Deploy the latest container image."
    />

    <button
      onClick={() => {
        if (form.repositoryUrl) {
          window.open(form.repositoryUrl, "_blank");
        }
      }}
      className="group rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
    >

      <div className="flex items-center gap-5">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-3xl text-white">

          🐙

        </div>

        <div>

          <div className="text-xl font-bold text-slate-900">
            Open Repository
          </div>

          <div className="mt-2 text-sm text-slate-500">
            View repository on GitHub.
          </div>

        </div>

      </div>

    </button>

  </div>

</div>

          {/* Activity Timeline */}

<div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

  {/* Header */}

  <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

    <div>

      <h3 className="text-2xl font-bold text-slate-900">
        Recent Activity
      </h3>

      <p className="mt-2 text-slate-500">
        Latest DevSecOps events for this repository.
      </p>

    </div>

    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
      Last 24 Hours
    </span>

  </div>

  {/* Timeline */}

  <div className="space-y-1 p-8">

    <TimelineItem
      status="success"
      icon="🚀"
      title="CI/CD Pipeline Completed"
      description="Build #241 finished successfully and artifacts were published."
      time="2 minutes ago"
    />

    <TimelineItem
      status="info"
      icon="🛡"
      title="Security Scan Finished"
      description="Trivy, Semgrep and Gitleaks completed successfully."
      time="5 minutes ago"
    />

    <TimelineItem
      status="deploy"
      icon="☸️"
      title="Deployment Updated"
      description="Application deployed to production namespace."
      time="12 minutes ago"
    />

    <TimelineItem
      status="github"
      icon="🐙"
      title="Repository Synced"
      description="Latest commits synchronized from GitHub."
      time="25 minutes ago"
    />

    <TimelineItem
      status="warning"
      icon="📦"
      title="Container Image Published"
      description="Docker image pushed to registry."
      time="48 minutes ago"
    />

  </div>

</div>

         {/* Repository Configuration */}

<div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

  {/* Header */}

  <div className="border-b border-slate-200 px-8 py-6">

    <h3 className="text-2xl font-bold text-slate-900">
      Repository Configuration
    </h3>

    <p className="mt-2 text-slate-500">
      Configure repository metadata and DevSecOps integration settings.
    </p>

  </div>

  <div className="space-y-10 p-8">

    {/* Basic Information */}

    <section>

      <h4 className="mb-6 text-lg font-bold text-slate-900">
        Basic Information
      </h4>

      <div className="grid gap-6 lg:grid-cols-2">

        <FormInput
          label="Application Name"
          value={form.name ?? ""}
          onChange={(v) => handleChange("name", v)}
        />

        <FormInput
          label="Primary Language"
          value={form.language ?? ""}
          onChange={(v) => handleChange("language", v)}
        />

      </div>

      <div className="mt-6">

        <FormTextarea
          label="Description"
          value={form.description ?? ""}
          onChange={(v) =>
            handleChange("description", v)
          }
        />

      </div>

    </section>

    {/* Repository */}

    <section>

      <h4 className="mb-6 text-lg font-bold text-slate-900">
        Repository
      </h4>

      <div className="grid gap-6 lg:grid-cols-2">

        <FormInput
          label="Repository Owner"
          value={form.repositoryOwner ?? ""}
          onChange={(v) =>
            handleChange("repositoryOwner", v)
          }
        />

        <FormInput
          label="Repository Name"
          value={form.repositoryName ?? ""}
          onChange={(v) =>
            handleChange("repositoryName", v)
          }
        />

      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Default Branch
          </label>

          <select
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            value={form.defaultBranch ?? "main"}
            onChange={(e) =>
              handleChange(
                "defaultBranch",
                e.target.value
              )
            }
          >
            <option>main</option>
            <option>develop</option>
            <option>dev</option>
            <option>release</option>
            <option>staging</option>
          </select>

        </div>

        <div className="rounded-2xl bg-slate-50 p-5">

          <div className="text-sm text-slate-500">

            Repository URL

          </div>

          <div className="mt-3 break-all font-semibold text-slate-900">

            {form.repositoryUrl}

          </div>

        </div>

      </div>

    </section>

    {/* Platform */}

    <section>

      <h4 className="mb-6 text-lg font-bold text-slate-900">
        Platform Status
      </h4>

      <div className="grid gap-5 md:grid-cols-3">

        <PlatformStatus
          title="Webhook"
          value={
            form.webhookEnabled
              ? "Connected"
              : "Disconnected"
          }
          healthy={form.webhookEnabled ?? false}
        />

        <PlatformStatus
          title="Repository"
          value={
            form.isArchived
              ? "Archived"
              : "Active"
          }
          healthy={!form.isArchived}
        />

        <PlatformStatus
          title="Visibility"
          value={
            form.isPrivate
              ? "Private"
              : "Public"
          }
          healthy
        />

      </div>

    </section>

  </div>

</div>
          {/* DevSecOps Scan Configuration */}

<div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

  {/* Header */}

  <div className="border-b border-slate-200 px-8 py-6">

    <h3 className="text-2xl font-bold text-slate-900">
      DevSecOps Scan Configuration
    </h3>

    <p className="mt-2 text-slate-500">
      Configure automated security scanning across the software delivery pipeline.
    </p>

  </div>

  <div className="grid gap-8 p-8 lg:grid-cols-[2fr,1fr]">

    {/* Left */}

    <div className="space-y-4">

      <ToggleCard
        title="Scan on Push"
        description="Automatically trigger scans after every Git push."
        checked={form.scanOnPush ?? false}
        onChange={(v) => handleChange("scanOnPush", v)}
      />

      <ToggleCard
        title="Scan on Pull Request"
        description="Validate pull requests before merging."
        checked={form.scanOnPullRequest ?? false}
        onChange={(v) => handleChange("scanOnPullRequest", v)}
      />

      <ToggleCard
        title="Automatic Remediation"
        description="Enable AI-assisted vulnerability remediation."
        checked={form.autoFixEnabled ?? false}
        onChange={(v) => handleChange("autoFixEnabled", v)}
      />

      <ToggleCard
        title="Secrets Detection (Gitleaks)"
        description="Detect leaked API keys, tokens and passwords."
        checked={form.scanSecrets ?? false}
        onChange={(v) => handleChange("scanSecrets", v)}
      />

      <ToggleCard
        title="SAST (Semgrep)"
        description="Perform static application security testing."
        checked={form.scanSast ?? false}
        onChange={(v) => handleChange("scanSast", v)}
      />

      <ToggleCard
        title="Dependency Scan"
        description="Identify vulnerable open-source packages."
        checked={form.scanDependencies ?? false}
        onChange={(v) => handleChange("scanDependencies", v)}
      />

      <ToggleCard
        title="IaC Scan (Checkov)"
        description="Validate Terraform and Kubernetes manifests."
        checked={form.scanIac ?? false}
        onChange={(v) => handleChange("scanIac", v)}
      />

      <ToggleCard
        title="Container Scan (Trivy)"
        description="Scan Docker images for CVEs."
        checked={form.scanContainers ?? false}
        onChange={(v) => handleChange("scanContainers", v)}
      />

    </div>

    {/* Right */}

    <div className="rounded-3xl bg-slate-900 p-6 text-white">

      <h4 className="text-xl font-bold">
        Scan Summary
      </h4>

      <div className="mt-8 space-y-6">

        <SummaryRow
          label="Secrets"
          enabled={form.scanSecrets ?? false}
        />

        <SummaryRow
          label="SAST"
          enabled={form.scanSast ?? false}
        />

        <SummaryRow
          label="Dependencies"
          enabled={form.scanDependencies ?? false}
        />

        <SummaryRow
          label="IaC"
          enabled={form.scanIac ?? false}
        />

        <SummaryRow
          label="Containers"
          enabled={form.scanContainers ?? false}
        />

      </div>

    </div>

  </div>

</div>

          {/* GitHub Integration */}

<div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

  {/* Header */}

  <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

    <div>

      <h3 className="text-2xl font-bold text-slate-900">
        GitHub Integration
      </h3>

      <p className="mt-2 text-slate-500">
        Repository synchronization, webhooks and DevSecOps automation.
      </p>

    </div>

    <span
      className={`rounded-full px-5 py-2 text-sm font-semibold ${
        form.webhookEnabled
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {form.webhookEnabled
        ? "Connected"
        : "Disconnected"}
    </span>

  </div>

  {/* Body */}

  <div className="grid gap-8 p-8 lg:grid-cols-[2fr,1fr]">

    {/* Left */}

    <div className="space-y-5">

      <IntegrationRow
        title="Webhook"
        value={
          form.webhookEnabled
            ? "Configured"
            : "Not Configured"
        }
      />

      <IntegrationRow
        title="Repository"
        value={`${form.repositoryOwner}/${form.repositoryName}`}
      />

      <IntegrationRow
        title="Branch"
        value={form.defaultBranch ?? "-"}
      />

      <IntegrationRow
        title="Repository URL"
        value={form.repositoryUrl ?? "-"}
      />

      <button
        className="mt-2 rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-slate-800"
      >
        Configure Webhook
      </button>

    </div>

    {/* Right */}

    <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">

      <div className="text-sm uppercase tracking-widest text-slate-400">

        Integration Health

      </div>

      <div className="mt-6 text-6xl font-black text-green-400">

        100%

      </div>

      <div className="mt-4 text-slate-300">

        Repository synchronization is healthy.

      </div>

      <div className="mt-8 space-y-3">

        <HealthItem
          label="Webhook"
          ok={form.webhookEnabled ?? false}
        />

        <HealthItem
          label="Repository Access"
          ok
        />

        <HealthItem
          label="CI/CD Integration"
          ok
        />

        <HealthItem
          label="Security Scanning"
          ok
        />

      </div>

    </div>

  </div>

</div>

          {/* Footer */}

<div className="sticky bottom-0 z-20 border-t border-slate-200 bg-white/95 px-8 py-6 backdrop-blur">

  <div className="sticky bottom-0 z-20 border-t border-slate-200 bg-white px-8 py-5">

  <div className="flex items-center justify-between">

    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
        ✅
      </div>

      <div>
        <div className="font-semibold text-slate-900">
          Ready to save changes
        </div>

        <div className="text-sm text-slate-500">
          Your edits haven't been saved yet.
        </div>
      </div>

    </div>

    <div className="flex gap-3">

      <button
        onClick={onClose}
        className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
      >
        Cancel
      </button>

      <button
        onClick={handleSave}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700"
      >
        Save Changes
      </button>

    </div>

  </div>

  <div className="mt-5 border-t pt-5">

    <button
      onClick={handleArchive}
      className="rounded-xl border border-red-300 px-5 py-3 text-red-600 transition hover:bg-red-50"
    >
      Archive Repository
    </button>

  </div>

</div>

</div>

        </div>
      )}
    </Drawer>
  );
}




function RepositoryInfo({
  title,
  value,
  icon,
}: {
  title: string;
  value: React.ReactNode;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
          {icon}
        </div>

        <div className="flex-1">

          <div className="text-xs uppercase tracking-wider text-slate-500">
            {title}
          </div>

          <div className="mt-2 break-all text-lg font-semibold text-slate-900">
            {value}
          </div>

        </div>

      </div>

    </div>
  );
}

function RepositoryStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-r border-slate-200 p-6 last:border-r-0">

      <div className="text-xs uppercase tracking-widest text-slate-500">
        {label}
      </div>

      <div className="mt-3 text-4xl font-bold text-slate-900">
        {value}
      </div>

    </div>
  );
}

function KubeCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: React.ReactNode;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">

          {icon}

        </div>

        <div>

          <div className="text-xs uppercase tracking-widest text-slate-500">

            {title}

          </div>

          <div className="mt-2 break-all text-lg font-semibold text-slate-900">

            {value}

          </div>

        </div>

      </div>

    </div>
  );
}

function StatusMetric({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="border-r border-slate-200 p-6 last:border-r-0">

      <div className="text-xs uppercase tracking-widest text-slate-500">

        {title}

      </div>

      <div className={`mt-3 text-4xl font-bold ${color}`}>

        {value}

      </div>

    </div>
  );
}

function ActionButton({
  title,
  subtitle,
  icon,
  color,
}: {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}) {
  return (
    <button
      className="group rounded-3xl border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >

      <div className="flex items-center gap-5">

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-3xl text-white shadow-lg`}
        >

          {icon}

        </div>

        <div>

          <div className="text-xl font-bold text-slate-900">
            {title}
          </div>

          <div className="mt-2 text-sm text-slate-500">
            {subtitle}
          </div>

        </div>

      </div>

    </button>
  );
}

function TimelineItem({
  icon,
  title,
  description,
  time,
  status,
}: {
  icon: string;
  title: string;
  description: string;
  time: string;
  status: "success" | "info" | "deploy" | "github" | "warning";
}) {

  const colors = {
    success: "bg-green-500",
    info: "bg-blue-500",
    deploy: "bg-violet-500",
    github: "bg-slate-700",
    warning: "bg-orange-500",
  };

  return (
    <div className="group relative flex gap-6 pb-8 last:pb-0">

      {/* Timeline */}

      <div className="flex flex-col items-center">

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white shadow-lg ${colors[status]}`}
        >
          {icon}
        </div>

        <div className="mt-2 h-full w-px bg-slate-200 group-last:hidden" />

      </div>

      {/* Content */}

      <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-500 hover:bg-white">

        <div className="flex items-center justify-between">

          <h4 className="text-lg font-bold text-slate-900">
            {title}
          </h4>

          <span className="text-sm text-slate-500">
            {time}
          </span>

        </div>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {description}
        </p>

      </div>

    </div>
  );
}

 function FormInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

    </div>
  );
}

function FormTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <textarea
        rows={5}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

    </div>
  );
}
function PlatformStatus({
  title,
  value,
  healthy,
}: {
  title: string;
  value: string;
  healthy: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

      <div className="text-xs uppercase tracking-widest text-slate-500">
        {title}
      </div>

      <div className="mt-3 flex items-center gap-3">

        <span
          className={`h-3 w-3 rounded-full ${
            healthy
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />

        <span className="text-lg font-bold text-slate-900">
          {value}
        </span>

      </div>

    </div>
  );
}

function ToggleCard({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-400 hover:bg-white">

      <div>

        <div className="text-lg font-semibold text-slate-900">
          {title}
        </div>

        <div className="mt-2 text-sm text-slate-500">
          {description}
        </div>

      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative flex h-8 w-14 items-center rounded-full transition ${
          checked
            ? "bg-blue-600"
            : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute h-6 w-6 rounded-full bg-white shadow transition ${
            checked
              ? "translate-x-7"
              : "translate-x-1"
          }`}
        />
      </button>

    </div>
  );
}
function SummaryRow({
  label,
  enabled,
}: {
  label: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-slate-300">
        {label}
      </span>

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          enabled
            ? "bg-green-500 text-white"
            : "bg-slate-700 text-slate-300"
        }`}
      >
        {enabled ? "Enabled" : "Disabled"}
      </span>

    </div>
  );
}
function IntegrationRow({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

      <div className="text-xs uppercase tracking-widest text-slate-500">

        {title}

      </div>

      <div className="mt-3 break-all text-lg font-semibold text-slate-900">

        {value}

      </div>

    </div>
  );
}
function PipelineMetric({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">

      <div className="text-xs uppercase tracking-widest text-slate-500">
        {title}
      </div>

      <div className={`mt-3 text-3xl font-bold ${color}`}>
        {value}
      </div>

    </div>
  );
}

function PipelineStage({
  name,
  complete,
}: {
  name: string;
  complete: boolean;
}) {
  return (
    <div className="mb-5 flex items-center gap-5">

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          complete
            ? "bg-green-500 text-white"
            : "bg-slate-300"
        }`}
      >
        {complete ? "✓" : ""}
      </div>

      <div className="flex-1">

        <div className="font-semibold text-slate-900">
          {name}
        </div>

        <div className="mt-2 h-2 rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-green-500"
            style={{ width: complete ? "100%" : "0%" }}
          />

        </div>

      </div>

    </div>
  );
}
function HealthItem({
  label,
  ok,
}: {
  label: string;
  ok: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
      <span className="text-slate-300">
        {label}
      </span>

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          ok
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {ok ? "Healthy" : "Failed"}
      </span>
    </div>
  );
}