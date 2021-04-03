import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserTypeOrm } from "./user.typeorm";

@Entity("points_record")
export class PointsRecordTypeOrm {
  @PrimaryColumn("uuid", { name: "points_record_id" })
  readonly id: string;

  @Column("integer", { name: "points", nullable: false })
  readonly points: number;

  @Column("varchar", { name: "message", length: 100, nullable: false })
  readonly message: string;

  // Relations
  @Column("uuid", { name: "user_id", nullable: false })
  readonly userId: string;
  @ManyToOne(() => UserTypeOrm)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  readonly user: UserTypeOrm;
}
