import { Module } from "@nestjs/common";
import { PersistenceModule } from "src/persistence/persistence.module";
import { ActivateReservationUserStory } from "./activate-reservation";
import { MakeReservationUserStory } from "./make-reservation";
import { GetMyReservationsUserStory } from "./get-my-reservations";
import { ReservationController } from "./reservation.controller";
import { CancelReservationUserStory } from "./cancel-reservation";

@Module({
  imports: [PersistenceModule],
  controllers: [ReservationController],
  providers: [
    ActivateReservationUserStory,
    MakeReservationUserStory,
    GetMyReservationsUserStory,
    CancelReservationUserStory,
  ],
})
export class ReservationModule {}
