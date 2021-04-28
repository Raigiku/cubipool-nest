import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CampusModule } from "./campus/campus.module";
import { CubicleModule } from "./cubicle/cubicle.module";

import { AuthModule } from "./auth/auth.module";
import { CommonModule } from "../common/common.module";
import { PersistenceModule } from "../persistence/persistence.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ReservationModule } from "./reservation/reservation.module";

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
    ScheduleModule.forRoot(),
    PersistenceModule,
    CommonModule,
    AuthModule,
    CubicleModule,
    CampusModule,
    ReservationModule,
  ],
})
export class AppModule {}
