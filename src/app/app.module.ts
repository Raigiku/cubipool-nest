import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "../auth/auth.module";
import { CommonModule } from "../common/common.module";
import { EntitiesModule } from "../entities/entities.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.CUBIPOOL_POSTGRESQL_URL,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    EntitiesModule,
    CommonModule,
    AuthModule,
  ],
})
export class AppModule {}
