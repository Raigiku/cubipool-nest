import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { PointsRecordTypeOrm } from "./points-record.typeorm";
import { UserPrizeTypeOrm } from "./user-prize.typeorm";
import { UserReservationTypeOrm } from "./user-reservation.typeorm";

@Entity("users")
export class UserTypeOrm {
  @PrimaryColumn("uuid", { name: "user_id" })
  readonly id: string;

  @Column("varchar", { name: "student_code", length: 100, nullable: false })
  readonly studentCode: string;

  @Column("varchar", { name: "username", length: 50, nullable: true })
  readonly username: string;

  @Column("varchar", { name: "password", length: 200, nullable: true })
  readonly password: string;

  @Column("integer", { name: "points", nullable: false })
  readonly points: number;

  @Column("integer", { name: "max_hours_per_day", nullable: false })
  readonly maxHoursPerDay: number;

  // Relations
  @OneToMany(() => UserReservationTypeOrm, (entity) => entity.user)
  readonly userReservations: UserReservationTypeOrm[];

  @OneToMany(() => PointsRecordTypeOrm, (entity) => entity.user)
  readonly pointsRecords: PointsRecordTypeOrm[];

  @OneToMany(() => UserPrizeTypeOrm, (entity) => entity.user)
  readonly userPrizes: UserPrizeTypeOrm[];
}
