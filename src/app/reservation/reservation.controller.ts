import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import {
  ActivateReservationUserStory,
  ActivateReservationUserStoryInput,
} from "./activate-reservation";
import { ActivateReservationBody } from "./activate-reservation/activate-reservation.body";
import { ActivateReservationParams } from "./activate-reservation/activate-reservation.params";
import { MakeReservationBody } from "./make-reservation/make-reservation.body";
import { MakeReservationParams } from "./make-reservation/make-reservation.params";
import { MakeReservationUserStoryInput,MakeReservationUserStory } from "./make-reservation";


@ApiBearerAuth()

@ApiBearerAuth()
@ApiTags("reservations")
@UseGuards(JwtAuthGuard)
@Controller("reservations")
export class ReservationController {
  constructor(
    private readonly activateReservationUserStory: ActivateReservationUserStory,
    private readonly makeReservationUserStory: MakeReservationUserStory
  ) {}

  @Post(":id/activate")
  async activateReservation(
    @Param() params: ActivateReservationParams,
    @Body() body: ActivateReservationBody
  ) {
    const input = new ActivateReservationUserStoryInput(body.activatorId, params.id);
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



  
}
