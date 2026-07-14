import { AppError } from "@/server/lib";
import { ProfileRepository } from "@/server/repositories";

export class ProfileService {
  private readonly profiles = new ProfileRepository();

  async getProfiles(userId: string) {
    return this.profiles.findByUserId(userId);
  }

  async getProfile(id: string) {
    const profile = await this.profiles.findById(id);

    if (!profile) {
      throw new AppError("Profile not found.", 404);
    }

    return profile;
  }

  async createProfile(data: {
    userId: string;
    name: string;
    type: "ADULT" | "KIDS";
  }) {
    return this.profiles.create(data);
  }

  async updateProfile(
    id: string,
    data: {
      name: string;
      avatar?: string | null;
    }
  ) {
    return this.profiles.update(id, data);
  }

  async deleteProfile(id: string) {
    return this.profiles.delete(id);
  }
}