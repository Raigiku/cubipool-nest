import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
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
    private readonly publicationRepository: Repository<PublicationTypeOrm>
  ) {}

  async execute(input: CreatePublicationUserStoryInput) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: input.reservationId },
      relations: ["userReservations", "publications"],
    });

    await this.validate(input, reservation);

    // create publication
    const newPublication = PublicationTypeOrm.New(
      input.description,
      input.sharedSeats,
      reservation!.id,
      reservation!
    );
    this.publicationRepository.save(newPublication);
    // update status of reservation
    reservation!.share();
    this.reservationRepository.save({
      id: reservation!.id,
      type: reservation!.type,
    });
  }

  async validate(
    input: CreatePublicationUserStoryInput,
    reservation: ReservationTypeOrm | undefined
  ) {
    const errors: string[] = [];

    // validate user exists
    const user = await this.userRepository.findOne({
      where: { id: input.userId },
    });
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
