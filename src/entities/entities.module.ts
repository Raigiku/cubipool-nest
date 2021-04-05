import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
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
} from "./typeorm";

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
  ],
})
export class EntitiesModule {}
