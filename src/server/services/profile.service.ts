import { AppError } from "@/server/lib";
import { ProfileRepository } from "@/server/repositories";
import { PROFILE_MESSAGES } from "@/server/auth";

export class ProfileService {
  private readonly profiles = new ProfileRepository();

  async getProfiles(userId: string) {
    return this.profiles.findByUserId(userId);
  }

  async getProfile(id: string) {
    const profile = await this.profiles.findById(id);

    if (!profile) {
      throw new AppError(PROFILE_MESSAGES.NOT_FOUND, 404);
    }

    return profile;
  }

  async createProfile(data: { userId: string; name: string; type: "ADULT" | "KIDS" }) {
    const profiles = await this.profiles.findByUserId(data.userId);

    if (profiles.length >= 5) {
      throw new AppError(PROFILE_MESSAGES.LIMIT_EXCEEDED, 400);
    }

    return this.profiles.create(data);
  }

  async updateProfile(
    id: string,
    data: {
      name?: string;
      avatar?: string | null;
    },
  ) {
    const profile = await this.profiles.findById(id);

    if (!profile) {
      throw new AppError(PROFILE_MESSAGES.NOT_FOUND, 404);
    }

    return this.profiles.update(id, data);
  }

  async deleteProfile(id: string) {
    const profile = await this.profiles.findById(id);

    if (!profile) {
      throw new AppError(PROFILE_MESSAGES.NOT_FOUND, 404);
    }

    const profiles = await this.profiles.findByUserId(profile.userId);

    if (profiles.length <= 1) {
      throw new AppError(PROFILE_MESSAGES.LAST_PROFILE, 400);
    }

    return this.profiles.delete(id);
  }
}
