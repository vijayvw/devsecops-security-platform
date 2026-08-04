import GitHubIntegrationCard from "../modules/settings/GitHubIntegrationCard";

export default function SettingsPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Configure integrations and platform settings.
        </p>
      </div>

      <GitHubIntegrationCard />

    </div>
  );
}