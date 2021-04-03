import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { CubicleTypeOrm } from "./cubicle.typeorm";
import { PublicationTypeOrm } from "./publication.typeorm";
import { UserReservationTypeOrm } from "./user-reservation.typeorm";

@Entity("reservations")
export class ReservationTypeOrm {
  @PrimaryColumn("uuid", { name: "reservation_id" })
  readonly id: string;

  @Column("enum", {
    name: "status",
    default: "NOT_ACTIVE",
    enum: ["NOT_ACTIVE", "ACTIVE", "CANCELLED", "SHARED", "FINISHED"],
    nullable: false,
  })
  readonly type: "NOT_ACTIVE" | "ACTIVE" | "CANCELLED" | "SHARED" | "FINISHED";

  @Column("timestamptz", { name: "start_time", nullable: false })
  readonly startTime: string;

  @Column("timestamptz", { name: "end_time", nullable: false })
  readonly endTime: string;

  // Relations
  @Column("uuid", { name: "cubicle_id", nullable: false })
  readonly cubicleId: string;
  @ManyToOne(() => CubicleTypeOrm)
  @JoinColumn({ name: "cubicle_id", referencedColumnName: "id" })
  readonly cubicle: CubicleTypeOrm;

  @OneToMany(() => PublicationTypeOrm, (entity) => entity.reservation)
  readonly publications: PublicationTypeOrm[];

  @OneToMany(() => UserReservationTypeOrm, (entity) => entity.reservation)
  readonly userReservations: UserReservationTypeOrm[];
}
