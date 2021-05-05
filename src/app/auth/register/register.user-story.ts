import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeOrm } from "../../../persistence/typeorm/entities";
import { Repository } from "typeorm";
import { RegisterUserStoryInput, RegisterUserStoryError } from ".";
import { hash as bcryptHash } from "bcryptjs";
import { HttpException, HttpStatus } from "@nestjs/common";
import { RegisterUserStoryOutput } from "./register.user-story.output";

export class RegisterUserStory {
  constructor(
    @InjectRepository(UserTypeOrm)
    private readonly userRepository: Repository<UserTypeOrm>
  ) {}

  async execute(input: RegisterUserStoryInput): Promise<RegisterUserStoryOutput> {
    await this.validate(input);
    const hashedPassword = await bcryptHash(input.password, 10);
    const newUser = UserTypeOrm.new(input.username, hashedPassword);
    this.userRepository.save(newUser);
    return RegisterUserStoryOutput.fromUser(newUser);
  }

  async validate(input: RegisterUserStoryInput) {
    const errors: string[] = [];

    // check if username exists
    const user = await this.userRepository.findOne({
      where: { username: input.username },
    });
    const usernameFound = user != null;
    if (usernameFound) {
      errors.push(RegisterUserStoryError.usernameExists);
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}
