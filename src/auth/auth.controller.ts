import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserTypeOrm } from "src/entities/typeorm";
import { LoginUserStory } from "./login.user-story";

@ApiTags('auth')
@Controller("auth")
export class AuthController {
  constructor(private readonly loginUserStory: LoginUserStory) {}

  @Get()
  testHello(): string {
    return "Hello World! Heroku!";
  }

  @Get("test-users")
  testGetUsers(): Promise<UserTypeOrm[]> {
    return this.loginUserStory.query();
  }
}
