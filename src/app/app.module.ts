import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "../auth/auth.module";
import { CommonModule } from "../common/common.module";
import { EntitiesModule } from "../entities/entities.module";

@Module({
  imports: [TypeOrmModule.forRoot(), EntitiesModule, CommonModule, AuthModule],
})
export class AppModule {}
