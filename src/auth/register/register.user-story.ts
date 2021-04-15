import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeOrm } from "src/entities/typeorm";
import { Repository } from "typeorm";
import { RegisterUserStoryInput, RegisterUserStoryError } from ".";
import { v4 as uuidv4 } from "uuid";
import { hash as bcryptHash } from "bcryptjs";
import { HttpException, HttpStatus } from "@nestjs/common";

export class RegisterUserStory {
  constructor(
    @InjectRepository(UserTypeOrm)
    private readonly userRepository: Repository<UserTypeOrm>
  ) {}

  async execute(input: RegisterUserStoryInput) {
    await this.validate(input);
    const hashedPassword = await bcryptHash(input.password, 10);
    const newUser: UserTypeOrm = {
      id: uuidv4(),
      username: input.username,
      password: hashedPassword,
      points: 0,
      maxHoursPerDay: 2,
      pointsRecords: null,
      userPrizes: null,
      userReservations: null,
    };
    this.userRepository.save(newUser);
  }

  async validate(input: RegisterUserStoryInput) {
    const errors: string[] = [];

    // check if username exists
    const user = await this.userRepository.findOne({
      where: { username: input.username },
    });
    const usernameFound = user != null;
    if (usernameFound) {
      errors.push(RegisterUserStoryError.usernameFound);
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}
