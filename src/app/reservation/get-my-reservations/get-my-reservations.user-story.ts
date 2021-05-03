import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ReservationTypeOrm,
  UserReservationTypeOrm,
} from "../../../persistence/typeorm/entities";

import { In, Repository } from "typeorm";
import { GetMyReservationsUserStoryOutput } from "./get-my-reservations.user-story.output";
import { GetMyReservationsUserStoryInput } from "./get-my-reservations.user-story.input";
import { GetMyReservationsUserStoryError } from "./get-my-reservations.user-story.error";

@Injectable()
export class GetMyReservationsUserStory {
  constructor(
    @InjectRepository(UserReservationTypeOrm)
    private readonly userReservationRepository: Repository<UserReservationTypeOrm>
  ) {}

  async execute(
    input: GetMyReservationsUserStoryInput
  ): Promise<GetMyReservationsUserStoryOutput[]> {
    this.validate(input);
    const reservations = await this.userReservationRepository.find({
      relations: [
        "reservation",
        "reservation.cubicle",
        "reservation.cubicle.campus",
      ],
      where: { userId: input.userId, type: In(input.userReservationRoles) },
    });
    return reservations.map((ur) =>
      GetMyReservationsUserStoryOutput.fromUserReservation(ur)
    );
  }

  validate(input: GetMyReservationsUserStoryInput) {
    const errors: string[] = [];

    // check if user reservation role exists
    const userReservationRoleNotFound = !input.userReservationRoles.every(
      (usrr) => UserReservationTypeOrm.types().includes(usrr)
    );
    if (userReservationRoleNotFound) {
      errors.push(GetMyReservationsUserStoryError.userReservationRoleNotFound);
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}
