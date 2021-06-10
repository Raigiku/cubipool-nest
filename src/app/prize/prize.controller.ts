import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { JwtPayload } from "src/common/jwt-payload";
import {
  GetAllPrizesUserStory,
  GetAllPrizesUserStoryInput,
} from "./get-all-prizes";

@ApiBearerAuth()
@ApiTags("prizes")
@UseGuards(JwtAuthGuard)
@Controller("prizes")
export class PrizeController {
  constructor(private getAllPrizesUserStory: GetAllPrizesUserStory) {}

  @Get()
  async getAllPrizes(@Request() request: { user: JwtPayload }) {
    const input = new GetAllPrizesUserStoryInput(request.user.userId);
    return this.getAllPrizesUserStory.execute(input);
  }
}
