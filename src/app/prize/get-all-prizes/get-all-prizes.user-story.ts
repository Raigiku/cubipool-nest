import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PrizeTypeOrm, UserTypeOrm } from "src/persistence/typeorm/entities";
import { Repository } from "typeorm";
import {
  GetAllPrizesUserStoryInput,
  GetAllPrizesUserStoryOutput,
  GetAllPrizesPrizeUserStoryOutput,
  GetAllPrizesUserStoryError,
} from ".";

export class GetAllPrizesUserStory {
  constructor(
    @InjectRepository(PrizeTypeOrm)
    private prizesRepository: Repository<PrizeTypeOrm>,
    @InjectRepository(UserTypeOrm)
    private userRepository: Repository<UserTypeOrm>
  ) {}

  async execute(input: GetAllPrizesUserStoryInput) {
    const allPrizes = await this.prizesRepository.find();
    const foundUser = await this.userRepository.findOne(input.userId);
    this.validate(foundUser);
    return new GetAllPrizesUserStoryOutput(
      foundUser.points,
      allPrizes.map(
        (p) =>
          new GetAllPrizesPrizeUserStoryOutput(
            p.id,
            p.name,
            p.description,
            p.pointsNeeded
          )
      )
    );
  }

  validate(user: UserTypeOrm) {
    let errors = [];
    if (user == null) {
      errors.push(GetAllPrizesUserStoryError.userNotFound);
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}
