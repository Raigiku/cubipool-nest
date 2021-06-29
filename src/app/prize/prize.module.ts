import { Module } from "@nestjs/common";
import { PersistenceModule } from "src/persistence/persistence.module";
import { ClaimPrizeUserStory } from "./claim-prize";
import { GetAllPrizesUserStory } from "./get-all-prizes";
import { PrizeController } from "./prize.controller";

@Module({
  imports: [PersistenceModule],
  controllers: [PrizeController],
  providers: [GetAllPrizesUserStory, ClaimPrizeUserStory],
})
export class PrizeModule {}
