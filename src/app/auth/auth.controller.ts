import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import {
  LoginUserStory,
  LoginUserStoryInput,
  LoginUserStoryOutput,
} from "./login";
import { RegisterUserStory, RegisterUserStoryInput } from "./register";
import { RegisterUserStoryOutput } from "./register/register.user-story.output";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly loginUserStory: LoginUserStory,
    private readonly registerUserStory: RegisterUserStory
  ) {}

  @Post("login")
  login(@Body() input: LoginUserStoryInput): Promise<LoginUserStoryOutput> {
    return this.loginUserStory.execute(input);
  }

  @Post("register")
  register(
    @Body() input: RegisterUserStoryInput
  ): Promise<RegisterUserStoryOutput> {
    return this.registerUserStory.execute(input);
  }
}
