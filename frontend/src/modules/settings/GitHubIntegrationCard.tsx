import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  githubApi,
  type GithubRepository,
  type GithubBranch,
} from "../../api/github";

export default function GitHubIntegrationCard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const [connected, setConnected] = useState(false);

  const [repositories, setRepositories] = useState<
    GithubRepository[]
  >([]);

  const [branches, setBranches] = useState<
    GithubBranch[]
  >([]);

  const [selectedRepo, setSelectedRepo] =
    useState("");

  const [selectedBranch, setSelectedBranch] =
    useState("");

  useEffect(() => {
    githubApi
      .getIntegration()
      .then((integration) => {
        if (!integration) return;

        setUsername(integration.username);
        setConnected(true);

        return githubApi.getRepositories();
      })
      .then((repos) => {
        if (repos) {
          setRepositories(repos);
        }
      })
      .catch(() => {});
  }, []);

  const connect = async () => {
    try {
      await githubApi.connect(
        username,
        token
      );

      setConnected(true);

      const repos =
        await githubApi.getRepositories();

      setRepositories(repos);

      alert("GitHub connected successfully.");
    } catch {
      alert("Failed to connect GitHub.");
    }
  };

  const testConnection = async () => {
    try {
      const user =
        await githubApi.testConnection();

      alert(`Connected as ${user.login}`);
    } catch {
      alert("Invalid GitHub token.");
    }
  };

  const loadBranches = async (
    fullName: string
  ) => {
    setSelectedRepo(fullName);

    const [owner, repo] =
      fullName.split("/");

    const data =
      await githubApi.getBranches(
        owner,
        repo
      );

    setBranches(data);
  };

  const importRepository = async () => {
    if (!selectedRepo) {
      alert("Select a repository.");
      return;
    }

    if (!selectedBranch) {
      alert("Select a branch.");
      return;
    }

    try {
      await githubApi.importRepository(
        selectedRepo,
        selectedBranch
      );

      alert(
        "Repository imported successfully!"
      );

      navigate("/applications");
    } catch (error) {
      console.error(error);
      alert("Import failed.");
    }
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">

      <h2 className="text-xl font-bold">
        GitHub Integration
      </h2>

      <input
        className="w-full rounded-lg border p-2"
        placeholder="GitHub Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
        type="password"
        className="w-full rounded-lg border p-2"
        placeholder="Personal Access Token"
        value={token}
        onChange={(e) =>
          setToken(e.target.value)
        }
      />

      <div className="flex gap-3">

        <button
          onClick={testConnection}
          className="rounded-lg border px-4 py-2"
        >
          Test Connection
        </button>

        <button
          onClick={connect}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Connect
        </button>

      </div>

      {connected && (
        <>
          <select
            className="w-full rounded-lg border p-2"
            value={selectedRepo}
            onChange={(e) =>
              loadBranches(e.target.value)
            }
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

          <select
            className="w-full rounded-lg border p-2"
            value={selectedBranch}
            onChange={(e) =>
              setSelectedBranch(
                e.target.value
              )
            }
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

          <button
            onClick={importRepository}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white"
          >
            Import Repository
          </button>
        </>
      )}

    </div>
  );
}