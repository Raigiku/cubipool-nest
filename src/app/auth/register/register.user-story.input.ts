import {
  IsPassword,
  IsUsername,
} from "../../../common/validators/user.validator";

export class RegisterUserStoryInput {
  @IsUsername()
  username: string;
  @IsPassword()
  password: string;
}
