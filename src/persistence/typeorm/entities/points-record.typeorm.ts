import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserTypeOrm } from "./user.typeorm";
import * as uuidjs from "uuid";

@Entity("points_record")
export class PointsRecordTypeOrm {
  @PrimaryColumn("uuid", { name: "points_record_id" })
  readonly id: string;

  @Column("integer", { name: "points", nullable: false })
  readonly points: number;

  @Column("varchar", { name: "message", length: 100, nullable: false })
  readonly message: string;

  @Column("timestamptz", { name: "created_at", nullable: false })
  readonly createdAt: string;

  // Relations
  @Column("uuid", { name: "user_id", nullable: false })
  readonly userId: string;
  @ManyToOne(() => UserTypeOrm)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  readonly user: UserTypeOrm;

  constructor(
    id: string,
    points: number,
    message: string,
    userId: string,
    createdAt: string
  ) {
    this.id = id;
    this.message = message;
    this.points = points;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  static new(
    points: number,
    message: string,
    userId: string
  ): PointsRecordTypeOrm {
    const newDate = new Date();

    return new PointsRecordTypeOrm(
      uuidjs.v4(),
      points,
      message,
      userId,
      Date.now().toLocaleString()
    );
  }
}
