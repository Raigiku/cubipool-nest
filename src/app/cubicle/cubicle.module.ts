import { Module } from "@nestjs/common";
import { PersistenceModule } from "src/persistence/persistence.module";
import { CubicleController } from "./cubicle.controller";
import { GetAvailableCubiclesUserStory } from "./get-available-cubicles";

@Module({
  imports: [PersistenceModule],
  controllers: [CubicleController],
  providers: [GetAvailableCubiclesUserStory],
})
export class CubicleModule {}
