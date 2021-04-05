import { Controller, Get } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Get()
  hello(): string {
    return "hello zeit now github actions prettier";
  }
}
