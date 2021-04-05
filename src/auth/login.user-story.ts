import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeOrm } from "src/entities/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class LoginUserStory {
  constructor(
    @InjectRepository(UserTypeOrm)
    private userRepository: Repository<UserTypeOrm>
  ) {}

  query(): Promise<UserTypeOrm[]> {
    return this.userRepository.find();
  }
}
