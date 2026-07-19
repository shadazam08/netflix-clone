import { AppError } from "@/server/lib";
import { MY_LIST_MESSAGES } from "@/server/auth";
import { MyListRepository, ProfileRepository, ContentRepository } from "@/server/repositories";
import { MyListMapper } from "@/server/mappers";
import { CreateMyListDto } from "@/server/dto";

export class MyListService {
  private readonly myListRepository = new MyListRepository();

  private readonly profileRepository = new ProfileRepository();

  private readonly contentRepository = new ContentRepository();

  async findAll() {
    const myLists = await this.myListRepository.findAll();

    return MyListMapper.toDtoList(myLists);
  }

  async findById(profileId: string, contentId: string) {
    const myList = await this.myListRepository.findById(profileId, contentId);

    if (!myList) {
      throw new AppError(MY_LIST_MESSAGES.NOT_FOUND, 404);
    }

    return MyListMapper.toDto(myList);
  }

  async create(dto: CreateMyListDto) {
    const profile = await this.profileRepository.findById(dto.profileId);

    if (!profile) {
      throw new AppError(MY_LIST_MESSAGES.PROFILE_NOT_FOUND, 404);
    }

    const content = await this.contentRepository.findById(dto.contentId);

    if (!content) {
      throw new AppError(MY_LIST_MESSAGES.CONTENT_NOT_FOUND, 404);
    }

    const existing = await this.myListRepository.findById(dto.profileId, dto.contentId);

    if (existing) {
      throw new AppError(MY_LIST_MESSAGES.ALREADY_EXISTS, 409);
    }

    const myList = await this.myListRepository.create({
      profile: {
        connect: {
          id: dto.profileId,
        },
      },
      content: {
        connect: {
          id: dto.contentId,
        },
      },
    });

    return MyListMapper.toDto(myList);
  }

  async delete(profileId: string, contentId: string) {
    await this.findById(profileId, contentId);

    await this.myListRepository.delete(profileId, contentId);
  }
}
