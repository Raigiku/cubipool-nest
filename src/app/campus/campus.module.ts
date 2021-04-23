import { Module } from "@nestjs/common";
import { PersistenceModule } from "src/persistence/persistence.module";
import { CampusController } from "./campus.controller";
import { GetAllCampusesUserStory } from "./get-all-campuses";

@Module({
  imports: [PersistenceModule],
  controllers: [CampusController],
  providers: [GetAllCampusesUserStory],
})
export class CampusModule {}
