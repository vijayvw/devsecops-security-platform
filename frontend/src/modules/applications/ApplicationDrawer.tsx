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

  const handleSave = async () => {
    if (!application) return;

    try {
      await applicationsApi.update(
        application.id,
        form
      );

      alert("Application updated successfully");

      onClose();

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update application");
    }
  };

  const handleArchive = async () => {
    if (!application) return;

    if (!confirm("Archive this repository?")) {
      return;
    }

    try {
      await applicationsApi.remove(application.id);

      alert("Repository archived.");

      onClose();

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to archive repository.");
    }
  };

  return (
    <Drawer
      open={application !== null}
      onClose={onClose}
      title="Repository Settings"
    >
      {application && (
        <div className="space-y-6">

          {/* Application */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Application Name
            </label>

            <input
              className="w-full rounded-lg border p-2"
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
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={3}
              className="w-full rounded-lg border p-2"
              value={form.description ?? ""}
              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }
            />
          </div>

          {/* Repository */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Repository URL
            </label>

            <input
              className="w-full rounded-lg border p-2"
              value={form.repositoryUrl ?? ""}
              onChange={(e) =>
                handleChange(
                  "repositoryUrl",
                  e.target.value
                )
              }
            />
          </div>

          {/* Repository Status */}

          <div className="rounded-xl border p-5 space-y-3">
            <h3 className="font-semibold">
              Repository Status
            </h3>

            <div className="flex justify-between">
              <span>Status</span>

              <span className="text-green-600">
                Connected
              </span>
            </div>

            <div className="flex justify-between">
              <span>Webhook</span>

              <span>
                {form.webhookEnabled
                  ? "Enabled"
                  : "Disabled"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Visibility</span>

              <span>
                {form.isPrivate
                  ? "Private"
                  : "Public"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Default Branch</span>

              <span>
                {form.defaultBranch}
              </span>
            </div>
          </div>

          {/* Owner */}

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="mb-1 block text-sm font-medium">
                Owner
              </label>

              <input
                className="w-full rounded-lg border p-2"
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
              <label className="mb-1 block text-sm font-medium">
                Repository
              </label>

              <input
                className="w-full rounded-lg border p-2"
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

          {/* Language */}

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="mb-1 block text-sm font-medium">
                Language
              </label>

              <input
                className="w-full rounded-lg border p-2"
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
              <label className="mb-1 block text-sm font-medium">
                Default Branch
              </label>

              <select
                className="w-full rounded-lg border p-2"
                value={
                  form.defaultBranch ??
                  "main"
                }
                onChange={(e) =>
                  handleChange(
                    "defaultBranch",
                    e.target.value
                  )
                }
              >
                <option value="main">
                  main
                </option>

                <option value="develop">
                  develop
                </option>

                <option value="dev">
                  dev
                </option>

                <option value="release">
                  release
                </option>

                <option value="staging">
                  staging
                </option>
              </select>
            </div>

          </div>

          {/* Scan Configuration */}

          <div className="rounded-xl border p-5 space-y-3">

            <h3 className="font-semibold">
              Scan Configuration
            </h3>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={
                  form.scanOnPush ??
                  false
                }
                onChange={(e) =>
                  handleChange(
                    "scanOnPush",
                    e.target.checked
                  )
                }
              />

              Scan on Push
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={
                  form.scanOnPullRequest ??
                  false
                }
                onChange={(e) =>
                  handleChange(
                    "scanOnPullRequest",
                    e.target.checked
                  )
                }
              />

              Scan on Pull Request
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={
                  form.autoFixEnabled ??
                  false
                }
                onChange={(e) =>
                  handleChange(
                    "autoFixEnabled",
                    e.target.checked
                  )
                }
              />

              Auto Fix
            </label>

            <hr />

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={
                  form.scanSecrets ??
                  false
                }
                onChange={(e) =>
                  handleChange(
                    "scanSecrets",
                    e.target.checked
                  )
                }
              />

              Secret Scan (Gitleaks)
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={
                  form.scanSast ??
                  false
                }
                onChange={(e) =>
                  handleChange(
                    "scanSast",
                    e.target.checked
                  )
                }
              />

              SAST (Semgrep)
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={
                  form.scanDependencies ??
                  false
                }
                onChange={(e) =>
                  handleChange(
                    "scanDependencies",
                    e.target.checked
                  )
                }
              />

              Dependency Scan
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={
                  form.scanIac ??
                  false
                }
                onChange={(e) =>
                  handleChange(
                    "scanIac",
                    e.target.checked
                  )
                }
              />

              IaC Scan (Checkov)
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={
                  form.scanContainers ??
                  false
                }
                onChange={(e) =>
                  handleChange(
                    "scanContainers",
                    e.target.checked
                  )
                }
              />

              Container Scan (Trivy)
            </label>

          </div>

          {/* Webhook */}

          <div className="rounded-xl border p-5 space-y-4">

            <h3 className="font-semibold">
              GitHub Webhook
            </h3>

            <div className="flex justify-between">
              <span>Status</span>

              <span
                className={
                  form.webhookEnabled
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {form.webhookEnabled
                  ? "Configured"
                  : "Not Configured"}
              </span>
            </div>

            <button
              className="w-full rounded-lg bg-gray-900 py-2 text-white"
            >
              Configure Webhook
            </button>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3">

            <button
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white"
            >
              Save Changes
            </button>

            <button
              onClick={handleArchive}
              className="rounded-lg bg-red-600 px-5 py-2 text-white"
            >
              Archive
            </button>

          </div>

        </div>
      )}
    </Drawer>
  );
}