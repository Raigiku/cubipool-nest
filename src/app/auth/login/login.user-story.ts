import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeOrm } from "../../../persistence/typeorm/entities/user.typeorm";
import { Repository } from "typeorm";
import {
  LoginUserStoryError,
  LoginUserStoryInput,
  LoginUserStoryOutput,
} from ".";
import { JwtPayload } from "../../../common/jwt-payload";
import { compare as bcryptCompare } from "bcryptjs";
import { HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class LoginUserStory {
  constructor(
    @InjectRepository(UserTypeOrm)
    private readonly userRepository: Repository<UserTypeOrm>,
    private readonly jwtService: JwtService
  ) {}

  async execute(input: LoginUserStoryInput): Promise<LoginUserStoryOutput> {
    const user = await this.userRepository.findOne({
      where: { username: input.username },
    });
    await this.validate(input, user);
    const payload: JwtPayload = { userId: user.id };
    const output: LoginUserStoryOutput = {
      jwt: this.jwtService.sign(payload),
    };
    return output;
  }

  async validate(input: LoginUserStoryInput, user: UserTypeOrm) {
    const errors: string[] = [];

    // check if username exists
    const usernameNotFound = user == null;
    if (usernameNotFound) {
      errors.push(LoginUserStoryError.usernameOrPasswordNotFound);
    }

    // check if passwords match
    if (!usernameNotFound) {
      const passwordsMatch = await bcryptCompare(input.password, user.password);
      if (!passwordsMatch) {
        errors.push(LoginUserStoryError.usernameOrPasswordNotFound);
      }
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}
