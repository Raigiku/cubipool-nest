import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import * as mom from "moment";
const moment = require("moment").default || require("moment");
import {
  CubicleTypeOrm,
  ReservationTypeOrm,
  UserReservationTypeOrm,
  UserTypeOrm,
} from "src/persistence/typeorm/entities";
import { Repository } from "typeorm";
import { CancelReservationUserStoryError } from "./cancel-reservation.user-story.error";
import { CancelReservationUserStoryInput } from "./cancel-reservation.user-story.input";

@Injectable()
export class CancelReservationUserStory {
  constructor(
    @InjectRepository(ReservationTypeOrm)
    private readonly reservationRepository: Repository<ReservationTypeOrm>,
    @InjectRepository(UserReservationTypeOrm)
    private readonly userReservationRepository: Repository<UserReservationTypeOrm>,
    @InjectRepository(UserTypeOrm)
    private readonly userRepository: Repository<UserTypeOrm>
  ) { }

  async execute(input: CancelReservationUserStoryInput) {
 

    const reservation = await this.reservationRepository.findOne({
      where: {
        id:input.reservationId
      },
    });
    console.log("reservation " + input.reservationId)
    const userReservation = await this.userReservationRepository.findOne({
      where: {
        reservationId:input.reservationId,
        userId:input.userId,
        type:"OWNER"
      }
    },)

    console.log("userReservation " + userReservation.reservationId)

    const user = await this.userRepository.findOne({
      where: { id: input.userId },
    });

    await this.validate(user, reservation, userReservation);

    if (reservation.isNotActive) {
      reservation.cancel();
      this.reservationRepository.save(reservation);
    }
  }

  async validate(
    user: UserTypeOrm,
    reservation: ReservationTypeOrm,
    userReservation: UserReservationTypeOrm
  ) {
    const errors: string[] = [];

    //check if user exist
    const UserNotFound = user == null;
    if (UserNotFound) {
      errors.push(CancelReservationUserStoryError.userNotFound);
    }

    //check if cubicle is avaliable
    const reservationNotAvaliable = reservation == null;
    if (reservationNotAvaliable) {
      errors.push(CancelReservationUserStoryError.reservationDoesNotExist);
    }

    const notEnoughPrivilege = userReservation == null;
    if (notEnoughPrivilege) {
    
      errors.push(CancelReservationUserStoryError.notEnoughPrivilege);
    }


    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}
