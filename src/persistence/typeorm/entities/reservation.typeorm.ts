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
import * as moment from "moment";

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
  type: "NOT_ACTIVE" | "ACTIVE" | "CANCELLED" | "SHARED" | "FINISHED";

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

  activate() {
    this.type = "ACTIVE";
  }

  finish() {
    this.type = "FINISHED";
  }

  get hasFinished() {
    return this.type === "FINISHED";
  }

  get readyToFinish() {
    return this.type === "ACTIVE" || "SHARED";
  }

  get msUntilEndTime() {
    return moment(this.endTime).diff(new Date());
  }

  get msUntilActivationTimeFrame() {
    return moment(new Date()).diff(this.startTime);
  }

  get notInsideActivationTimeFrame() {
    const millisecondDiff = this.msUntilActivationTimeFrame;
    return !(millisecondDiff >= 0 && millisecondDiff <= 300000);
  }
}
