import { Module } from "@nestjs/common";
import { PersistenceModule } from "src/persistence/persistence.module";
import { ActivateReservationUserStory } from "./activate-reservation";
import { MakeReservationUserStory } from "./make-reservation";
import { ReservationController } from "./reservation.controller";


@Module({
  imports: [PersistenceModule],
  controllers: [ReservationController],
  providers: [ActivateReservationUserStory,MakeReservationUserStory],
})
export class ReservationModule {}
