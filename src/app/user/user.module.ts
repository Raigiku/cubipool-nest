import { Module } from "@nestjs/common";
import { PersistenceModule } from "src/persistence/persistence.module";
import { UserController } from "./user.controller";
import { GetProfileUserStory } from "./get-profile";
import { GetPointsUserStory } from "./get-points/get-points.user-story";

@Module({
  imports: [PersistenceModule],
  controllers: [UserController],
  providers: [GetProfileUserStory, GetPointsUserStory],
})
export class UserModule {}
