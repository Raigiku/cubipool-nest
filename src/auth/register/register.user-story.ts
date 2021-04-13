import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeOrm } from "src/entities/typeorm";
import { Repository } from "typeorm";
import { RegisterUserStoryInput, RegisterUserStoryException } from ".";
import { v4 as uuidv4 } from "uuid";
import { hash as bcryptHash } from "bcryptjs";

export class RegisterUserStory {
  constructor(
    @InjectRepository(UserTypeOrm)
    private readonly userRepository: Repository<UserTypeOrm>
  ) {}

  async execute(input: RegisterUserStoryInput) {
    const user = await this.userRepository.findOne({
      where: { username: input.username },
    });
    const usernameFound = user != null;
    if (usernameFound) {
      throw RegisterUserStoryException.usernameFound;
    }

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
}
