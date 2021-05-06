import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import {
  GetAvailableCubiclesUserStory,
  GetAvailableCubiclesUserStoryInput,
  GetAvailableCubiclesUserStoryOutput,
  GetAvailableCubiclesUserStoryQueries,
  GetAvailableCubiclesUserStoryParams,
} from "./get-available-cubicles";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("cubicles")
@Controller()
export class CubicleController {
  constructor(
    private readonly getAvailableCubiclesUserStory: GetAvailableCubiclesUserStory
  ) {}

  @Get("campuses/:campusId/cubicles/available")
  getAvailableCubicles(
    @Param() params: GetAvailableCubiclesUserStoryParams,
    @Query() queries: GetAvailableCubiclesUserStoryQueries
  ): Promise<GetAvailableCubiclesUserStoryOutput[]> {
    const input = GetAvailableCubiclesUserStoryInput.fromController(
      params,
      queries
    );
    return this.getAvailableCubiclesUserStory.execute(input);
  }
}
