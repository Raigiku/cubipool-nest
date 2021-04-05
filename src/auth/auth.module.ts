import { Module } from "@nestjs/common";
import { EntitiesModule } from "src/entities/entities.module";
import { AuthController } from "./auth.controller";
import { LoginUserStory } from "./login.user-story";

@Module({
  imports: [EntitiesModule],
  controllers: [AuthController],
  providers: [LoginUserStory],
})
export class AuthModule {}
