import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { JwtPayload } from "src/common/jwt-payload";
import { GetPointsUserStory } from "./get-points/get-points.user-story";
import { GetPointsUserStoryInput } from "./get-points/get-points.user-story.input";
import { GetPointsUserStoryOutput } from "./get-points/get-points.user-story.output";
import { GetProfileUserStory, GetProfileUserStoryOutput } from "./get-profile";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(
    private readonly getProfileUserStory: GetProfileUserStory,
    readonly getPointsUserStory: GetPointsUserStory
  ) {}

  @Get()
  async getProfile(
    @Request() request: { user: JwtPayload }
  ): Promise<GetProfileUserStoryOutput> {
    return this.getProfileUserStory.execute(request.user.userId);
  }

  @Get("points")
  async getPointsHistory(
    @Request() request: { user: JwtPayload }
  ): Promise<GetPointsUserStoryOutput[]> {
    const input = new GetPointsUserStoryInput(request.user.userId);
    return this.getPointsUserStory.execute(input);
  }
}
