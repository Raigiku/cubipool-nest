import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  PointsRecordTypeOrm,
  PrizeTypeOrm,
  UserPrizeTypeOrm,
  UserTypeOrm,
} from "src/persistence/typeorm/entities";
import { Repository } from "typeorm";
import { ClaimPrizeUserStoryInput } from ".";
import { ClaimPrizeUserStoryError } from "./claim-prize.user-story.error";
import { ClaimPrizeUserStoryOutput } from "./claim-prize.user-story.output";

export class ClaimPrizeUserStory {
  constructor(
    @InjectRepository(PrizeTypeOrm)
    private prizesRepository: Repository<PrizeTypeOrm>,
    @InjectRepository(UserTypeOrm)
    private userRepository: Repository<UserTypeOrm>,
    @InjectRepository(UserPrizeTypeOrm)
    private userPrizeRepository: Repository<UserPrizeTypeOrm>,
    @InjectRepository(PointsRecordTypeOrm)
    private pointsRecordRepository: Repository<PointsRecordTypeOrm>

  ) {}

  async execute(input: ClaimPrizeUserStoryInput) {
    const allPrizes = await this.prizesRepository.find();
    const foundUser = await this.userRepository.findOne(input.userId);
    let userPrize = UserPrizeTypeOrm.newUserPrize(input.prizeId, input.userId);

    let currentPrize=allPrizes.find(obj=>{return obj.id==input.prizeId})

    let pointsRecord=PointsRecordTypeOrm.new(currentPrize.pointsNeeded*-1,"Reclamo " + currentPrize.name,input.userId)


    this.validate(foundUser,currentPrize.pointsNeeded);

    this.pointsRecordRepository.save(pointsRecord)

    

    await this.userPrizeRepository.save(userPrize)

    foundUser.reducePoints(currentPrize.pointsNeeded)

    await this.userRepository.save(foundUser)
    return new ClaimPrizeUserStoryOutput(
      );
  }

  validate(user: UserTypeOrm, pointsNeeded: number) {
    let errors = [];
    if (user == null) {
      errors.push(ClaimPrizeUserStoryError.userNotFound);
    }

    if (pointsNeeded > user.points) {
      errors.push(ClaimPrizeUserStoryError.notEnoughPoints);
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}
