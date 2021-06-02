import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeOrm } from "src/persistence/typeorm/entities";
import { Repository } from "typeorm";
import { GetProfileUserStoryOutput } from "./get-profile.user-story.output";

export class GetProfileUserStory {
  constructor(
    @InjectRepository(UserTypeOrm)
    private readonly userRepository: Repository<UserTypeOrm>
  ) {}

  async execute(userId: string): Promise<GetProfileUserStoryOutput> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    var profile = new GetProfileUserStoryOutput();
    profile.points = user.points;
    profile.studentCode = user.username;
    return profile;
  }
}
