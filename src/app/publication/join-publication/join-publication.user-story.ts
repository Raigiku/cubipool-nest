import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  PublicationTypeOrm,
  ReservationTypeOrm,
  UserReservationTypeOrm,
  UserTypeOrm,
} from "src/persistence/typeorm/entities";
import { Repository, In, getRepository } from "typeorm";
import { JoinPublicationUserStoryError } from "./join-publication.user-story.error";
import { JoinPublicationUserStoryInput } from "./join-publication.user-story.input";

export class JoinPublicationUserStory {
  constructor(
    @InjectRepository(UserTypeOrm)
    private readonly userRepository: Repository<UserTypeOrm>,
    @InjectRepository(ReservationTypeOrm)
    private readonly reservationRepository: Repository<ReservationTypeOrm>,
    @InjectRepository(PublicationTypeOrm)
    private readonly publicationRepository: Repository<PublicationTypeOrm>,
    @InjectRepository(UserReservationTypeOrm)
    private readonly userReservationRepository: Repository<PublicationTypeOrm>
  ) {}

  async execute(input: JoinPublicationUserStoryInput) {
    const userReservation = await getRepository(UserReservationTypeOrm)
      .createQueryBuilder("ur")
      .leftJoinAndSelect("ur.reservation", "reservation")
      .where("reservation.type In('ACTIVE','SHARED')")
      .getOne();
    const publication = await this.publicationRepository.findOne({
      where: { id: input.publicationId },
    });

    await this.validate(input, userReservation);

    const NewUserReservation = UserReservationTypeOrm.newGuest(
      input.userId,
      publication.reservationId
    );

    this.userReservationRepository.save(NewUserReservation);
  }

  async validate(
    input: JoinPublicationUserStoryInput,
    userReservation: UserReservationTypeOrm | undefined
  ) {
    const errors: string[] = [];

    // validate user exists
    const user = await this.userRepository.findOne({
      where: { id: input.userId },
    });
    const userExist = user != null;
    if (!userExist) {
      errors.push(JoinPublicationUserStoryError.userDoesntExist);
    }

    // validate userReservation does not exists
    const userReservationExist = userReservation == null;
    if (!userReservationExist) {
      errors.push(JoinPublicationUserStoryError.tooManyRequest);
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}
