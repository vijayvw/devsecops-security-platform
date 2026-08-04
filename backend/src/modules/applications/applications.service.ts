import { applicationsRepository } from "./applications.repository";
import { UpdateApplicationDto } from "./application.dto";

export class ApplicationsService {
  async getAll() {
    return applicationsRepository.findAll();
  }

  async getArchived() {
    return applicationsRepository.findArchived();
  }

  async getById(id: string) {
    const application = await applicationsRepository.findById(id);

    if (!application) {
      throw new Error("Application not found");
    }

    return application;
  }

  async create(data: any) {
    const exists = await applicationsRepository.findByName(data.name);

    if (exists) {
      throw new Error("Application already exists");
    }

    return applicationsRepository.create(data);
  }

  async update(id: string, data: UpdateApplicationDto) {
    await this.getById(id);

    return applicationsRepository.update(id, data);
  }

  async restore(id: string) {
    await this.getById(id);

    return applicationsRepository.restore(id);
  }

  async delete(id: string) {
    await this.getById(id);

    return applicationsRepository.delete(id);
  }
}

export const applicationsService = new ApplicationsService();