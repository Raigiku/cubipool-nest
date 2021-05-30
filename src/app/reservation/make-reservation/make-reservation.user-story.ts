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
import { Between, Repository, In } from "typeorm";
import { MakeReservationUserStoryError } from "./make-reservation.user-story.error";
import { MakeReservationUserStoryInput } from "./make-reservation.user-story.input";

@Injectable()
export class MakeReservationUserStory {
  constructor(
    @InjectRepository(ReservationTypeOrm)
    private readonly reservationRepository: Repository<ReservationTypeOrm>,
    @InjectRepository(UserReservationTypeOrm)
    private readonly userReservationRepository: Repository<UserReservationTypeOrm>,
    @InjectRepository(UserTypeOrm)
    private readonly userRepository: Repository<UserTypeOrm>,
    private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  async execute(input: MakeReservationUserStoryInput) {
    let start_time = new Date(input.startTime);
    let end_time = new Date(input.endTime);

    const reservation = await this.reservationRepository.findOne({
      where: {
        cubicleId: input.cubicleId,
        type: In(["NOT_ACTIVE", "ACTIVE"]),
        endTime: Between(
          start_time.toLocaleString(),
          end_time.toLocaleString()
        ),
      },
    });
    //starttime=2021-05-01 03:57:00.000000 +00:00
    //endtime=2021-05-02 06:32:00.000000
    console.log(start_time.toLocaleString());
    console.log(reservation);
    const user = await this.userRepository.findOne({
      where: { id: input.userId },
    });
    await this.validate(user, reservation);

    let newReservation = new ReservationTypeOrm(
      input.startTime,
      input.cubicleId,
      input.userId,
      input.endTime
    );
    newReservation.userReservations = new Array<UserReservationTypeOrm>();
    newReservation.userReservations.push(
      UserReservationTypeOrm.newHost(input.userId, newReservation.id)
    );

    this.reservationRepository.save(newReservation);

    
  }

  async validate(user: UserTypeOrm, reservation: ReservationTypeOrm) {
    const errors: string[] = [];

    //check if user exist
    const UserNotFound = user == null;
    if (UserNotFound) {
      errors.push(MakeReservationUserStoryError.userNotFound);
    }

    //check if cubicle is avaliable
    const cubicleNotAvaliable = reservation == null;
    if (!cubicleNotAvaliable) {
      errors.push(MakeReservationUserStoryError.cubicleNotAvaliable);
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}
