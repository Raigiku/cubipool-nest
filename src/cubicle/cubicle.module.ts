import { Module } from "@nestjs/common";
import { EntitiesModule } from "src/entities/entities.module";
import { CubicleController } from "./cubicle.controller";
import { GetAvailableCubiclesUserStory } from "./get-available-cubicles";

@Module({
  imports: [EntitiesModule],
  controllers: [CubicleController],
  providers: [GetAvailableCubiclesUserStory],
})
export class CubicleModule {}
