import { Module } from "@nestjs/common";
import { PersistenceModule } from "src/persistence/persistence.module";
import { ActivateReservationUserStory } from "./activate-reservation";
import { GetMyReservationsUserStory } from "./get-my-reservations";
import { ReservationController } from "./reservation.controller";

@Module({
  imports: [PersistenceModule],
  controllers: [ReservationController],
  providers: [ActivateReservationUserStory, GetMyReservationsUserStory],
})
export class ReservationModule {}
