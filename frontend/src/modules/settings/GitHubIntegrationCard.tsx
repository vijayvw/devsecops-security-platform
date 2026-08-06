import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  githubApi,
  type GithubBranch,
  type GithubRepository,
} from "../../api/github";

export default function GitHubIntegrationCard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const [connected, setConnected] = useState(false);

  const [repositories, setRepositories] =
    useState<GithubRepository[]>([]);

  const [branches, setBranches] =
    useState<GithubBranch[]>([]);

  const [selectedRepo, setSelectedRepo] = useState("");

  const [selectedBranch, setSelectedBranch] =
    useState("");

  const [connecting, setConnecting] =
    useState(false);

  const [testing, setTesting] =
    useState(false);

  const [importing, setImporting] =
    useState(false);

  useEffect(() => {
    githubApi
      .getIntegration()
      .then(async (integration) => {
        if (!integration) return;

        setUsername(integration.username);
        setConnected(true);

        const repos =
          await githubApi.getRepositories();

        setRepositories(repos);
      })
      .catch(console.error);
  }, []);

  const repositoryCount = useMemo(
    () => repositories.length,
    [repositories]
  );

  async function connect() {
    try {
      setConnecting(true);

      await githubApi.connect(username, token);

      setConnected(true);

      const repos =
        await githubApi.getRepositories();

      setRepositories(repos);

      alert("GitHub connected successfully.");
    } catch {
      alert("Failed to connect GitHub.");
    } finally {
      setConnecting(false);
    }
  }

  async function testConnection() {
    try {
      setTesting(true);

      const user =
        await githubApi.testConnection();

      alert(`Connected as ${user.login}`);
    } catch {
      alert("Invalid GitHub token.");
    } finally {
      setTesting(false);
    }
  }

  async function loadBranches(
    fullName: string
  ) {
    setSelectedRepo(fullName);
    setSelectedBranch("");

    const [owner, repo] =
      fullName.split("/");

    const data =
      await githubApi.getBranches(owner, repo);

    setBranches(data);
  }

  async function importRepository() {
    if (!selectedRepo) {
      alert("Select a repository.");
      return;
    }

    if (!selectedBranch) {
      alert("Select a branch.");
      return;
    }

    try {
      setImporting(true);

      await githubApi.importRepository(
        selectedRepo,
        selectedBranch
      );

      alert("Repository imported successfully!");

      navigate("/applications");
    } catch (err) {
      console.error(err);

      alert("Import failed.");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-5xl shadow-lg">
              ⚙️
            </div>

            <div>

              <h2 className="text-4xl font-bold">
                Platform Settings
              </h2>

              <p className="mt-2 max-w-2xl text-slate-300">
                Configure GitHub integration, repository imports,
                scan automation and platform connectivity.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <StatusCard
              title="GitHub"
              value={connected ? "Connected" : "Offline"}
              icon="🐙"
              color={
                connected
                  ? "bg-green-600"
                  : "bg-red-600"
              }
            />

            <StatusCard
              title="Repositories"
              value={String(repositoryCount)}
              icon="📦"
              color="bg-blue-600"
            />

          </div>

        </div>

      </div>

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="xl:col-span-2 rounded-3xl border bg-white p-8 shadow-sm">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h3 className="text-2xl font-bold">
                GitHub Connection
              </h3>

              <p className="mt-2 text-slate-500">
                Connect your GitHub account using a Personal Access Token.
              </p>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                connected
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {connected
                ? "🟢 Connected"
                : "🔴 Not Connected"}
            </span>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold">
                GitHub Username
              </label>

              <input
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="vijayvw"
                className="w-full rounded-xl border px-4 py-3 transition focus:border-blue-500 focus:outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Personal Access Token
              </label>

              <input
                type="password"
                value={token}
                onChange={(e) =>
                  setToken(e.target.value)
                }
                placeholder="ghp_xxxxxxxxxxxxxxxxx"
                className="w-full rounded-xl border px-4 py-3 transition focus:border-blue-500 focus:outline-none"
              />

            </div>

          </div>

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={testConnection}
              disabled={testing}
              className="rounded-xl border px-6 py-3 font-semibold transition hover:bg-slate-100 disabled:opacity-50"
            >
              {testing
                ? "Testing..."
                : "🔍 Test Connection"}
            </button>

            <button
              onClick={connect}
              disabled={connecting}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {connecting
                ? "Connecting..."
                : "🔗 Connect GitHub"}
            </button>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-4">

            <InfoBox
              label="Status"
              value={connected ? "Connected" : "Offline"}
            />

            <InfoBox
              label="Repositories"
              value={String(repositoryCount)}
            />

            <InfoBox
              label="Webhook"
              value="Disabled"
            />

            <InfoBox
              label="Sync"
              value="Manual"
            />

          </div>

        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm">

          <h3 className="text-2xl font-bold">
            Scan Configuration
          </h3>

          <p className="mt-2 text-slate-500">
            Enable scanners that run after repository import.
          </p>

          <div className="mt-8 space-y-5">

            <SettingToggle
              title="Container Scan"
              description="Trivy"
              enabled
            />

            <SettingToggle
              title="IaC Scan"
              description="Checkov"
              enabled
            />

            <SettingToggle
              title="SAST Scan"
              description="Semgrep"
              enabled
            />

            <SettingToggle
              title="Secrets Scan"
              description="Gitleaks"
              enabled
            />

            <SettingToggle
              title="Dependency Scan"
              description="OWASP Dependency Check"
              enabled
            />

          </div>

        </div>

      </div>
            {/* Repository Import */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <div className="mb-8">

          <h3 className="text-2xl font-bold">
            Import Repository
          </h3>

          <p className="mt-2 text-slate-500">
            Choose a repository and branch to import into the platform.
          </p>

        </div>

        {!connected ? (

          <div className="rounded-2xl border border-dashed p-16 text-center">

            <div className="text-6xl">
              🔒
            </div>

            <h4 className="mt-5 text-2xl font-bold">
              GitHub Not Connected
            </h4>

            <p className="mt-2 text-slate-500">
              Connect your GitHub account before importing repositories.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 xl:grid-cols-3">

            {/* Import Form */}

            <div className="xl:col-span-2 space-y-6">

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Repository
                </label>

                <select
                  value={selectedRepo}
                  onChange={(e) =>
                    loadBranches(e.target.value)
                  }
                  className="w-full rounded-xl border px-4 py-3"
                >

                  <option value="">
                    Select Repository
                  </option>

                  {repositories.map((repo) => (

                    <option
                      key={repo.id}
                      value={repo.full_name}
                    >
                      {repo.full_name}
                    </option>

                  ))}

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Branch
                </label>

                <select
                  value={selectedBranch}
                  onChange={(e) =>
                    setSelectedBranch(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border px-4 py-3"
                >

                  <option value="">
                    Select Branch
                  </option>

                  {branches.map((branch) => (

                    <option
                      key={branch.name}
                      value={branch.name}
                    >
                      {branch.name}
                    </option>

                  ))}

                </select>

              </div>

              <button
                onClick={importRepository}
                disabled={importing}
                className="w-full rounded-xl bg-green-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
              >
                {importing
                  ? "Importing Repository..."
                  : "🚀 Import Repository"}
              </button>

            </div>

            {/* Repository Information */}

            <div className="rounded-2xl bg-slate-50 p-6">

              <h4 className="text-xl font-bold">
                Repository Information
              </h4>

              <div className="mt-6 space-y-5">

                <InfoRow
                  label="Selected Repository"
                  value={selectedRepo || "-"}
                />

                <InfoRow
                  label="Selected Branch"
                  value={selectedBranch || "-"}
                />

                <InfoRow
                  label="Visibility"
                  value="Public"
                />

                <InfoRow
                  label="Scan Pipeline"
                  value="Enabled"
                />

                <InfoRow
                  label="Deployment"
                  value="Automatic"
                />

                <InfoRow
                  label="Namespace"
                  value="default"
                />

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}
function StatusCard({
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
    <div className="rounded-2xl bg-slate-800 p-5">

      <div className="flex items-center justify-between">

        <div>

          <div className="text-xs uppercase tracking-wider text-slate-400">
            {title}
          </div>

          <div className="mt-3 text-2xl font-bold text-white">
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

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border p-5">

      <div className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </div>

      <div className="mt-3 text-lg font-semibold">
        {value}
      </div>

    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <div className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </div>

      <div className="mt-1 break-all text-sm font-semibold text-slate-900">
        {value}
      </div>

    </div>
  );
}
function SettingToggle({
  title,
  description,
  enabled,
}: {
  title: string;
  description: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border p-4">

      <div>

        <div className="font-semibold">
          {title}
        </div>

        <div className="text-sm text-slate-500">
          {description}
        </div>

      </div>

      <div
        className={`flex h-7 w-12 items-center rounded-full p-1 ${
          enabled
            ? "bg-green-500"
            : "bg-slate-300"
        }`}
      >
        <div
          className={`h-5 w-5 rounded-full bg-white transition ${
            enabled
              ? "translate-x-5"
              : ""
          }`}
        />
      </div>

    </div>
  );
}