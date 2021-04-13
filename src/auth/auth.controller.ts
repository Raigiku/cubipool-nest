import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import {
  LoginUserStory,
  LoginUserStoryInput,
  LoginUserStoryOutput,
} from "./login";
import { RegisterUserStory, RegisterUserStoryInput } from "./register";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly loginUserStory: LoginUserStory,
    private readonly registerUserStory: RegisterUserStory
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  testHello(): string {
    return "Hello World! Heroku!";
  }

  @Post("login")
  login(@Body() input: LoginUserStoryInput): Promise<LoginUserStoryOutput> {
    return this.loginUserStory.query(input);
  }

  @Post("register")
  register(@Body() input: RegisterUserStoryInput) {
    return this.registerUserStory.execute(input);
  }
}
