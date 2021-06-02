import { Module } from "@nestjs/common";
import { PersistenceModule } from "src/persistence/persistence.module";
import { UserController } from "./user.controller";
import { GetProfileUserStory } from "./get-profile";

@Module({
  imports: [PersistenceModule],
  controllers: [UserController],
  providers: [GetProfileUserStory],
})
export class UserModule {}
