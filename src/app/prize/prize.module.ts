import { Module } from "@nestjs/common";
import { PersistenceModule } from "src/persistence/persistence.module";
import { GetAllPrizesUserStory } from "./get-all-prizes";
import { PrizeController } from "./prize.controller";

@Module({
  imports: [PersistenceModule],
  controllers: [PrizeController],
  providers: [GetAllPrizesUserStory],
})
export class PrizeModule {}
