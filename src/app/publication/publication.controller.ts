import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { JwtPayload } from "src/common/jwt-payload";
import {
  CreatePublicationBody,
  CreatePublicationUserStory,
  CreatePublicationUserStoryInput,
} from "./create-publication";

import {
  JoinPublicationBody,
  JoinPublicationUserStory,
  JoinPublicationUserStoryInput,
} from "./join-publication";

@ApiBearerAuth()
@ApiTags("publications")
@UseGuards(JwtAuthGuard)
@Controller("publications")
export class PublicationController {
  constructor(
    private readonly createPublicationUserStory: CreatePublicationUserStory,
    private readonly joinPublicationUserStory: JoinPublicationUserStory
  ) {}

  @Post()
  async createPublication(
    @Request() request: { user: JwtPayload },
    @Body() body: CreatePublicationBody
  ) {
    const input: CreatePublicationUserStoryInput = {
      description: body.description,
      sharedSeats: body.sharedSeats,
      reservationId: body.reservationId,
      userId: request.user.userId,
    };
    return this.createPublicationUserStory.execute(input);
  }

  @Post('join')
  async joinPublication(
    @Request() request: { user: JwtPayload },
    @Body() body: JoinPublicationBody
  ) {
    const input: JoinPublicationUserStoryInput = {
      reservationId: body.reservationId,
      userId: request.user.userId,
      publicationId: body.publicationId
    };
    return this.joinPublicationUserStory.execute(input);
  }

}
