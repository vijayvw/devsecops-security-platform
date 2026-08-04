import api from "../client";

export interface Application {
  id: string;
  name: string;
  description?: string;

  repositoryUrl: string;
  repositoryOwner?: string;
  repositoryName?: string;

  defaultBranch: string;
  language: string;

  isPrivate: boolean;

  webhookEnabled: boolean;
  webhookSecret?: string;

  scanOnPush: boolean;
  scanOnPullRequest: boolean;
  autoFixEnabled: boolean;

  scanSecrets: boolean;
  scanSast: boolean;
  scanDependencies: boolean;
  scanIac: boolean;
  scanContainers: boolean;

  isArchived: boolean;

  createdAt: string;
  updatedAt: string;
}

export const applicationsApi = {
  async getAll() {
    const { data } = await api.get("/applications");
    return data as Application[];
  },

  async getById(id: string) {
    const { data } = await api.get(`/applications/${id}`);
    return data as Application;
  },

  async create(payload: Partial<Application>) {
    const { data } = await api.post("/applications", payload);
    return data;
  },

  async update(id: string, payload: Partial<Application>) {
    const { data } = await api.patch(
      `/applications/${id}`,
      payload
    );

    return data;
  },

  async remove(id: string) {
    await api.delete(`/applications/${id}`);
  },

  async getArchived() {
    const { data } = await api.get(
      "/applications/archived"
    );

    return data as Application[];
  },

  async restore(id: string) {
    const { data } = await api.patch(
      `/applications/${id}/restore`
    );

    return data;
  },
};