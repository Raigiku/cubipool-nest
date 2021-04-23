import { IsPassword, IsUsername } from "../../../common/validators/user.validator";

export class LoginUserStoryInput {
  @IsUsername()
  username: string;
  @IsPassword()
  password: string;
}
