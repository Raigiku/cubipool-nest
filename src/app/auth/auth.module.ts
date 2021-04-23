import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PersistenceModule } from "../../persistence/persistence.module";
import { AuthController } from "./auth.controller";
import { LoginUserStory } from "./login";
import { RegisterUserStory } from "./register";
import { JwtStrategy } from "../../common/strategies/jwt.strategy";

@Module({
  imports: [
    PersistenceModule,
    JwtModule.register({
      secret: process.env.CUBIPOOL_JWT_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUserStory, RegisterUserStory, JwtStrategy],
})
export class AuthModule {}
