import {
  Body,
  Controller,
  Get,
  Request,
  Param,
  Post,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { JwtPayload } from "src/common/jwt-payload";
import { GetAllCampusesUserStory } from "../campus/get-all-campuses";
import {
  ActivateReservationUserStory,
  ActivateReservationUserStoryInput,
} from "./activate-reservation";
import { ActivateReservationBody } from "./activate-reservation/activate-reservation.body";
import { ActivateReservationParams } from "./activate-reservation/activate-reservation.params";
import { MakeReservationBody } from "./make-reservation/make-reservation.body";
import { MakeReservationParams } from "./make-reservation/make-reservation.params";
import { MakeReservationUserStoryInput,MakeReservationUserStory } from "./make-reservation";
import {
  GetMyReservationsUserStory,
  GetMyReservationsUserStoryInput,
  GetMyReservationsUserStoryOutput,
} from "./get-my-reservations";
import { GetMyReservationsQueries } from "./get-my-reservations/get-my-reservations.queries";


@ApiBearerAuth()
@ApiTags("reservations")
@UseGuards(JwtAuthGuard)
@Controller("reservations")
export class ReservationController {
  constructor(
    private readonly activateReservationUserStory: ActivateReservationUserStory,
    private readonly makeReservationUserStory: MakeReservationUserStory,
    private readonly getAllReservationUserStory: GetMyReservationsUserStory
  ) {}

  @Post(":id/activate")
  async activateReservation(
    @Param() params: ActivateReservationParams,
    @Body() body: ActivateReservationBody
  ) {
    const input = new ActivateReservationUserStoryInput(
      body.activatorUsername,
      params.id
    );
    return this.activateReservationUserStory.execute(input);
  }


  @Post("")
  async createReservation(
    @Param() params: MakeReservationParams,
    @Body() body: MakeReservationBody
  ) {
    const input = new MakeReservationUserStoryInput(body.startTime,body.userId,body.cubicleId);
    return this.makeReservationUserStory.execute(input);
  }



  

  @Get("/me")
  getMyReservations(
    @Request() request: { user: JwtPayload },
    @Query() queries: GetMyReservationsQueries
  ): Promise<GetMyReservationsUserStoryOutput[]> {
    const input: GetMyReservationsUserStoryInput = {
      userId: request.user.userId,
      userReservationRoles:
        typeof queries.userReservationRoles === "string"
          ? [queries.userReservationRoles]
          : queries.userReservationRoles,
    };
    return this.getAllReservationUserStory.execute(input);
  }

}
