import { Module } from "@nestjs/common";
import { EntitiesModule } from "src/entities/entities.module";
import { CampusController } from "./campus.controller";
import { GetAllCampusesUserStory } from "./get-all-campuses";

@Module({
  imports: [EntitiesModule],
  controllers: [CampusController],
  providers: [GetAllCampusesUserStory],
})
export class CampusModule {}
