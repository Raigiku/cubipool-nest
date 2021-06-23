import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  PointsRecordTypeOrm,
  PublicationTypeOrm,
  ReservationTypeOrm,
  UserReservationTypeOrm,
  UserTypeOrm,
} from "src/persistence/typeorm/entities";
import { Repository } from "typeorm";
import { CreatePublicationUserStoryError } from "./create-publication.user-story.error";
import { CreatePublicationUserStoryInput } from "./create-publication.user-story.input";

export class CreatePublicationUserStory {
  constructor(
    @InjectRepository(UserTypeOrm)
    private readonly userRepository: Repository<UserTypeOrm>,
    @InjectRepository(ReservationTypeOrm)
    private readonly reservationRepository: Repository<ReservationTypeOrm>,
    @InjectRepository(PublicationTypeOrm)
    private readonly publicationRepository: Repository<PublicationTypeOrm>,
    @InjectRepository(PointsRecordTypeOrm)
    private readonly pointsRecordRepository: Repository<PointsRecordTypeOrm>
  ) {}

  async execute(input: CreatePublicationUserStoryInput) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: input.reservationId },
      relations: ["userReservations", "publications"],
    });
    const user = await this.userRepository.findOne({
      where: { id: input.userId },
    });

    await this.validate(input, reservation, user);

    const rewardedPoints = 10;
    // add points to user record
    const newPointsRecord = PointsRecordTypeOrm.new(
      rewardedPoints,
      "Compartí cubículo",
      input.userId
    );
    await this.pointsRecordRepository.save(newPointsRecord);
    // add points to user
    await this.userRepository.save({
      id: user.id,
      points: user.points + rewardedPoints,
    });
    // create publication
    const newPublication = PublicationTypeOrm.New(
      input.description,
      input.sharedSeats,
      reservation!.id,
      reservation!
    );
    await this.publicationRepository.save(newPublication);
    // update status of reservation
    reservation!.share();
    await this.reservationRepository.save({
      id: reservation!.id,
      type: reservation!.type,
    });
  }

  async validate(
    input: CreatePublicationUserStoryInput,
    reservation: ReservationTypeOrm | undefined,
    user: UserTypeOrm | undefined
  ) {
    const errors: string[] = [];

    // validate user exists
    const userExist = user != null;
    if (!userExist) {
      errors.push(CreatePublicationUserStoryError.userDoesntExist);
    }

    // validate reservation exists
    const reservationExist = reservation != null;
    if (!reservationExist) {
      errors.push(CreatePublicationUserStoryError.reservationDoesntExist);
    }

    if (userExist && reservationExist) {
      // validate if user is the owner of the reservation
      const userReservation = reservation!.userReservations.filter(
        (ur) =>
          ur.userId === user!.id && ur.type === UserReservationTypeOrm.ownerType
      );
      const userIsOwner = userReservation.length > 0;
      if (!userIsOwner) {
        errors.push(CreatePublicationUserStoryError.userIsntOwner);
      }

      // validate if reservation is active
      if (userIsOwner) {
        if (!reservation!.isActive) {
          errors.push(CreatePublicationUserStoryError.reservationIsntActive);
        }
      }
    }

    // validate if publication already exists
    if (reservationExist) {
      const publicationsAlreadyExist = reservation!.publications.length > 0;
      if (publicationsAlreadyExist) {
        errors.push(
          CreatePublicationUserStoryError.reservationAlreadyHasPublications
        );
      }
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}
