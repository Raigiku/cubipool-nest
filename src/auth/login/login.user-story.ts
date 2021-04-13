import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeOrm } from "src/entities/typeorm";
import { Repository } from "typeorm";
import {
  LoginUserStoryException,
  LoginUserStoryInput,
  LoginUserStoryOutput,
} from ".";
import { compare as bcryptCompare } from "bcryptjs";

@Injectable()
export class LoginUserStory {
  constructor(
    @InjectRepository(UserTypeOrm)
    private readonly userRepository: Repository<UserTypeOrm>,
    private readonly jwtService: JwtService
  ) {}

  async query(input: LoginUserStoryInput): Promise<LoginUserStoryOutput> {
    const user = await this.userRepository.findOne({
      where: { username: input.username },
    });
    const usernameNotFound = user == null;
    if (usernameNotFound) {
      throw LoginUserStoryException.usernameOrPasswordNotFound;
    }

    const passwordsMatch = await bcryptCompare(input.password, user.password);
    if (!passwordsMatch) {
      throw LoginUserStoryException.usernameOrPasswordNotFound;
    }

    const payload = { id: user.id };
    const output: LoginUserStoryOutput = {
      jwt: this.jwtService.sign(payload),
    };
    return output;
  }
}
