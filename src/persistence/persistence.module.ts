import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./interfaces/user.repository";
import {
  CampusTypeOrm,
  CubicleTypeOrm,
  PointsRecordTypeOrm,
  PrizeTypeOrm,
  PublicationTypeOrm,
  ReservationTypeOrm,
  UserPrizeTypeOrm,
  UserReservationTypeOrm,
  UserTypeOrm,
} from "./typeorm/entities";
import { UserRepositoryTypeOrm } from "./typeorm/repositories";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CampusTypeOrm,
      CubicleTypeOrm,
      PointsRecordTypeOrm,
      PrizeTypeOrm,
      PublicationTypeOrm,
      ReservationTypeOrm,
      UserPrizeTypeOrm,
      UserReservationTypeOrm,
      UserTypeOrm,
    ]),
  ],
  exports: [
    TypeOrmModule.forFeature([
      CampusTypeOrm,
      CubicleTypeOrm,
      PointsRecordTypeOrm,
      PrizeTypeOrm,
      PublicationTypeOrm,
      ReservationTypeOrm,
      UserPrizeTypeOrm,
      UserReservationTypeOrm,
      UserTypeOrm,
    ]),
    UserRepository,
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryTypeOrm,
    },
  ],
})
export class PersistenceModule {}
