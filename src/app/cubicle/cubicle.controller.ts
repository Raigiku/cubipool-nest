import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import {
  GetAvailableCubiclesUserStory,
  GetAvailableCubiclesUserStoryInput,
  GetAvailableCubiclesUserStoryOutput,
} from "./get-available-cubicles";

@ApiTags("cubicles")
@Controller("cubicles")
export class CubicleController {
  constructor(
    private readonly getAvailableCubiclesUserStory: GetAvailableCubiclesUserStory
  ) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Get("available")
  // getAvailableCubicles(input: GetAvailableCubiclesUserStoryInput): GetAvailableCubiclesUserStoryOutput {
  //   return this.getAvailableCubiclesUserStory.execute(input);
  // }
}
