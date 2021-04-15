import { IsPassword, IsUsername } from "src/common/validators/user.validator";

export class LoginUserStoryInput {
  @IsUsername()
  username: string;
  @IsPassword()
  password: string;
}
