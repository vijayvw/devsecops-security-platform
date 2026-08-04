import { prisma } from "../../database";
import { AppError } from "../../errors/app-error";
import { ApplicationRepository } from "./repository";
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from "./types";

export class ApplicationService {
  private readonly repository: ApplicationRepository;

  constructor() {
    this.repository = new ApplicationRepository(prisma);
  }

  async create(data: CreateApplicationDto) {
    return this.repository.create(data);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const application = await this.repository.findById(id);

    if (!application) {
      throw new AppError("Application not found", 404);
    }

    return application;
  }

  async update(
    id: string,
    data: UpdateApplicationDto,
  ) {
    await this.findById(id);

    return this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.repository.delete(id);
  }

  async getArchived() {
  return applicationsRepository.findArchived();
}

async restore(id: string) {
  return applicationsRepository.restore(id);
}
}