import api from "../client";

export interface GithubIntegration {
  id?: string;
  username: string;
  token?: string;
  isConnected?: boolean;
  lastChecked?: string | null;
}

export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  default_branch: string;
}

export interface GithubBranch {
  name: string;
}

export const githubApi = {
  async getIntegration() {
    const { data } = await api.get(
      "/github/integration"
    );

    return data as GithubIntegration | null;
  },

  async connect(
    username: string,
    token: string
  ) {
    const { data } = await api.post(
      "/github/connect",
      {
        username,
        token,
      }
    );

    return data;
  },

  async update(
    username: string,
    token: string
  ) {
    const { data } = await api.patch(
      "/github/connect",
      {
        username,
        token,
      }
    );

    return data;
  },

  async disconnect() {
    await api.delete("/github/connect");
  },

  async testConnection() {
    const { data } = await api.get(
      "/github/test"
    );

    return data;
  },

  async getRepositories() {
    const { data } = await api.get(
      "/github/repositories"
    );

    return data as GithubRepository[];
  },

  async getBranches(
    owner: string,
    repo: string
  ) {
    const { data } = await api.get(
      `/github/branches/${owner}/${repo}`
    );

    return data as GithubBranch[];
  },

  async importRepository(
    repository: string,
    branch: string
  ) {
    const { data } = await api.post(
      "/github/import",
      {
        repository,
        branch,
      }
    );

    return data;
  },
};