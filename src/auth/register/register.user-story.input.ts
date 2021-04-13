import { IsNotEmpty, MaxLength } from "class-validator";

export class RegisterUserStoryInput {
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  @MaxLength(200)
  password: string;
}
