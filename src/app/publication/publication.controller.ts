import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { JwtPayload } from "src/common/jwt-payload";
import {
  CreatePublicationBody,
  CreatePublicationUserStory,
  CreatePublicationUserStoryInput,
} from "./create-publication";
import { GetActivePublicationsUserStory } from "./get-active-publications/get-active-publications.user-story";
import { GetActivePublicationsUserStoryInput } from "./get-active-publications/get-active-publications.user-story.input";
import { GetActivePublicationsUserStoryOutput } from "./get-active-publications/get-active-publications.user-story.output";

import {
  JoinPublicationBody,
  JoinPublicationUserStory,
  JoinPublicationUserStoryInput,
} from "./join-publication";

@ApiBearerAuth()
@ApiTags("publications")
@UseGuards(JwtAuthGuard)
@Controller()
export class PublicationController {
  constructor(
    private readonly createPublicationUserStory: CreatePublicationUserStory,
    private readonly joinPublicationUserStory: JoinPublicationUserStory,
    private readonly getActivePublicationsUserStory: GetActivePublicationsUserStory
  ) {}

  @Post("publications")
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

  @Post("publications/join")
  async joinPublication(
    @Request() request: { user: JwtPayload },
    @Body() body: JoinPublicationBody
  ) {
    const input: JoinPublicationUserStoryInput = {
      userId: request.user.userId,
      publicationId: body.publicationId,
    };
    return this.joinPublicationUserStory.execute(input);
  }

  @Get("campuses/:campusId/publications")
  async getActivePublications(
    @Param("campusId") campusId: string
  ): Promise<GetActivePublicationsUserStoryOutput[]> {
    const input = {
      campusId: campusId,
    } as GetActivePublicationsUserStoryInput;
    return this.getActivePublicationsUserStory.execute(input);
  }
}
