import { UserTypeOrm } from "src/persistence/typeorm/entities";

export class RegisterUserStoryOutput {
  id: string;
  username: string;
  points: number;
  maxHoursPerDay: number;

  static fromUser(user: UserTypeOrm): RegisterUserStoryOutput {
    return {
      id: user.id,
      maxHoursPerDay: user.maxHoursPerDay,
      points: user.points,
      username: user.username,
    };
  }
}
