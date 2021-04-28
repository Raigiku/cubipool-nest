import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ReservationTypeOrm,
  UserReservationTypeOrm,
  UserTypeOrm,
} from "src/persistence/typeorm/entities";
import { Repository } from "typeorm";
import { ActivateReservationUserStoryError } from "./activate-reservation.user-story.error";
import { ActivateReservationUserStoryInput } from "./activate-reservation.user-story.input";

@Injectable()
export class ActivateReservationUserStory {
  constructor(
    @InjectRepository(ReservationTypeOrm)
    private readonly reservationRepository: Repository<ReservationTypeOrm>,
    @InjectRepository(UserReservationTypeOrm)
    private readonly userReservationRepository: Repository<UserReservationTypeOrm>,
    @InjectRepository(UserTypeOrm)
    private readonly userRepository: Repository<UserTypeOrm>,
    private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  async execute(input: ActivateReservationUserStoryInput) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: input.reservationId },
    });
    const activatorUser = await this.userRepository.findOne({
      where: { id: input.activatorId },
    });
    await this.validate(activatorUser, reservation);

    // save reservation as active in database
    reservation.activate();
    this.reservationRepository.save(reservation);
    const activatorReservation = UserReservationTypeOrm.newActivator(
      activatorUser,
      reservation
    );
    this.userReservationRepository.save(activatorReservation);

    // call cron job to set reservation as finished
    const callback = async () => {
      const reservation = await this.reservationRepository.findOne({
        where: { id: input.reservationId },
      });
      if (reservation.readyToFinish) {
        reservation.finish();
        this.reservationRepository.save(reservation);
      }
    };
    const timeout = setTimeout(callback, reservation.msUntilEndTime);
    this.schedulerRegistry.addTimeout(
      `finish reservation ${reservation.id}`,
      timeout
    );
  }

  async validate(activatorUser: UserTypeOrm, reservation: ReservationTypeOrm) {
    const errors: string[] = [];

    // check if activator exists
    const activatorNotFound = activatorUser == null;
    if (activatorNotFound) {
      errors.push(ActivateReservationUserStoryError.activatorNotFound);
    }

    // check if reservation exists
    const reservationNotFound = reservation == null;
    if (reservationNotFound) {
      errors.push(ActivateReservationUserStoryError.reservationNotFound);
    }

    // check if reservation is not pending activation
    const reservationNotPendingActivation =
      reservation != null && reservation.type !== "NOT_ACTIVE";
    if (reservationNotPendingActivation) {
      errors.push(
        ActivateReservationUserStoryError.reservationNotPendingActivation
      );
    }

    // check if difference between start time and now is less or equal to 5 minutes
    if (
      reservation != null &&
      !reservation.hasFinished &&
      reservation.notInsideActivationTimeFrame
    ) {
      const msUntilActivationTimeFrame = reservation.msUntilActivationTimeFrame;
      if (msUntilActivationTimeFrame > 0) {
        errors.push(
          ActivateReservationUserStoryError.reservationActivationTimeFramePassed
        );
      } else {
        errors.push(
          ActivateReservationUserStoryError.notInsideActivationTimeFrame(
            msUntilActivationTimeFrame * -1
          )
        );
      }
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}
