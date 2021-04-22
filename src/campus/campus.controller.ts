import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { GetAllCampusesUserStory, GetAllCampusesUserStoryOutput } from "./get-all-campuses";

@ApiTags("campuses")
@Controller("campuses")
export class CampusController {
  constructor(
    private readonly getAllCampusesUserUserStory: GetAllCampusesUserStory
  ) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Get()
  // getAllCampuses(): Promise<GetAllCampusesUserStoryOutput[]> {
  //   return this.getAllCampusesUserUserStory.query();
  // }
}
