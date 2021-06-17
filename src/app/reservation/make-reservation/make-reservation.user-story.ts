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

    const reservationActives = await this.reservationRepository
      .createQueryBuilder("reservation")
      .leftJoinAndSelect(
        "reservation.userReservations",
        "userReservation",
        "reservation.type IN ('NOT_ACTIVE','ACTIVE')"
      )
      .where("userReservation.userId=:userId", { userId: input.userId })
      .getOne();
    //starttime=2021-05-01 03:57:00.000000 +00:00
    //endtime=2021-05-02 06:32:00.000000
    console.log(start_time.toDateString());
    console.log(reservation);
    const user = await this.userRepository.findOne({
      where: { id: input.userId },
    });

    await this.validate(user, reservation, reservationActives);

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

    // call cron job to set reservation as finished
    const callback = async () => {
      const reservation = await this.reservationRepository.findOne({
        where: { id: newReservation.id },
      });
      if (reservation.isNotActive) {
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

  async validate(
    user: UserTypeOrm,
    reservation: ReservationTypeOrm,
    reservationActives: ReservationTypeOrm
  ) {
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

    const pendingCubicle = reservationActives == null;
    if (!pendingCubicle) {
      errors.push(MakeReservationUserStoryError.pendientCubicle);
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}
