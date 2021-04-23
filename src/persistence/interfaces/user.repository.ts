import { UserTypeOrm } from "src/persistence/typeorm/entities";

export abstract class UserRepository {
  findOneByUsername(username: string): Promise<UserTypeOrm> {
    return null;
  }
}
