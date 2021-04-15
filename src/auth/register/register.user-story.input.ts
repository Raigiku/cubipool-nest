import { IsPassword, IsUsername } from "src/common/validators/user.validator";

export class RegisterUserStoryInput {
  @IsUsername()
  username: string;
  @IsPassword()
  password: string;
}
