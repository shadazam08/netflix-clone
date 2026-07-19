import { Prisma } from "@/generated/prisma/client";
import { MyListResponseDto } from "@/server/dto";

type MyListWithRelations =
  Prisma.MyListGetPayload<{
    include: {
      profile: true;
      content: true;
    };
  }>;

export class MyListMapper {
  static toDto(
    myList: MyListWithRelations
  ): MyListResponseDto {
    return {
      profileId: myList.profileId,
      contentId: myList.contentId,
      createdAt: myList.createdAt,
    };
  }

  static toDtoList(
    myLists: MyListWithRelations[]
  ): MyListResponseDto[] {
    return myLists.map((myList) =>
      this.toDto(myList)
    );
  }
}