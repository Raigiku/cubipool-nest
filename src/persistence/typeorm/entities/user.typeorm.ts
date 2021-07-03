import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { PointsRecordTypeOrm } from "./points-record.typeorm";
import { UserPrizeTypeOrm } from "./user-prize.typeorm";
import { UserReservationTypeOrm } from "./user-reservation.typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
export class UserTypeOrm {
  @PrimaryColumn("uuid", { name: "user_id" })
  readonly id: string;

  @Column("varchar", { name: "username", length: 50, nullable: true })
  readonly username: string;

  @Column("varchar", { name: "password", length: 200, nullable: true })
  readonly password: string;

  @Column("integer", { name: "points", nullable: false })
  points: number;

  @Column("integer", { name: "max_hours_per_day", nullable: false })
  readonly maxHoursPerDay: number;

  // Relations
  @OneToMany(() => UserReservationTypeOrm, (entity) => entity.user)
  readonly userReservations: UserReservationTypeOrm[];

  @OneToMany(() => PointsRecordTypeOrm, (entity) => entity.user)
  readonly pointsRecords: PointsRecordTypeOrm[];

  @OneToMany(() => UserPrizeTypeOrm, (entity) => entity.user)
  readonly userPrizes: UserPrizeTypeOrm[];

  reducePoints(points: number) {
    this.points = this.points - points;
  }

  static new(username: string, hashedPassword: string): UserTypeOrm {
    return {
      id: uuidv4(),
      username: username,
      password: hashedPassword,
      points: 0,
      maxHoursPerDay: 2,
      pointsRecords: null,
      userPrizes: null,
      userReservations: null,
      reducePoints: null,
    };
  }
}
