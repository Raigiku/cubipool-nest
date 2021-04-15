import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

@ApiTags("cubicles")
@Controller("cubicles")
export class CubicleController {
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("available")
  getAvailable(): string {
    return "Hello World! Heroku!";
  }
}
