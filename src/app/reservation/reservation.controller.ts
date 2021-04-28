import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import {
  ActivateReservationUserStory,
  ActivateReservationUserStoryInput,
} from "./activate-reservation";
import { ActivateReservationBody } from "./activate-reservation/activate-reservation.body";
import { ActivateReservationParams } from "./activate-reservation/activate-reservation.params";

@ApiBearerAuth()
@ApiTags("reservations")
@UseGuards(JwtAuthGuard)
@Controller("reservations")
export class ReservationController {
  constructor(
    private readonly activateReservationUserStory: ActivateReservationUserStory
  ) {}

  @Post(":id/activate")
  async activateReservation(
    @Param() params: ActivateReservationParams,
    @Body() body: ActivateReservationBody
  ) {
    const input = new ActivateReservationUserStoryInput(body.activatorId, params.id);
    return this.activateReservationUserStory.execute(input);
  }
}
