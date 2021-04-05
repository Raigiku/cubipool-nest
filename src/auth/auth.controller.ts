import { Controller, Get } from "@nestjs/common";
import { UserTypeOrm } from "src/entities/typeorm";
import { LoginUserStory } from "./login.user-story";

@Controller("auth")
export class AuthController {
  constructor(private loginUserStory: LoginUserStory) {}

  @Get()
  testGet(): string {
    return "its working";
    // return this.loginUserStory.query();
  }
}
