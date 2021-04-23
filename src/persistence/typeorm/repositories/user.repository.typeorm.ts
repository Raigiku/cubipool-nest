import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/persistence/interfaces/user.repository";
import { UserTypeOrm } from "src/persistence/typeorm/entities";
import { Repository } from "typeorm";

@Injectable()
export class UserRepositoryTypeOrm implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrm)
    private readonly userRepository: Repository<UserTypeOrm>
  ) {}

  async findOneByUsername(username: string): Promise<UserTypeOrm> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    return user;
  }
}
