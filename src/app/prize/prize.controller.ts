import { Controller, Get, UseGuards, Request,Post,Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { JwtPayload } from "src/common/jwt-payload";
import {
  GetAllPrizesUserStory,
  GetAllPrizesUserStoryInput,
} from "./get-all-prizes";

import{
ClaimPrizeUserStory,
ClaimPrizeUserStoryInput,
ClaimPrizeUserStoryParams

} from "./claim-prize"

@ApiBearerAuth()
@ApiTags("prizes")
@UseGuards(JwtAuthGuard)
@Controller("prizes")
export class PrizeController {
  constructor(private getAllPrizesUserStory: GetAllPrizesUserStory,private claimPrizeUserStory:ClaimPrizeUserStory) {}

  @Get()
  async getAllPrizes(@Request() request: { user: JwtPayload }) {
    const input = new GetAllPrizesUserStoryInput(request.user.userId);
    return this.getAllPrizesUserStory.execute(input);
  }

  @Post('/claim/:id')
  async claimPrize(@Request() request: { user: JwtPayload },
  @Param() params: ClaimPrizeUserStoryParams,
  ) {
    const input = new ClaimPrizeUserStoryInput(request.user.userId,params.id);
    return this.claimPrizeUserStory.execute(input);
  }

}
