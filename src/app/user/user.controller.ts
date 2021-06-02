import { Controller, Get, UseGuards,Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { JwtPayload } from "src/common/jwt-payload";
import {
  GetProfileUserStory,
  GetProfileUserStoryOutput,
} from "./get-profile";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(
    private readonly getProfileUserStory: GetProfileUserStory
  ) {}

  @Get()
  async getProfile(
    @Request() request: { user: JwtPayload }
  ): Promise<GetProfileUserStoryOutput> {
    return this.getProfileUserStory.execute(request.user.userId);
  }
}
