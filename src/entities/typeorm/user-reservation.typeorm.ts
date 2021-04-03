import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ReservationTypeOrm } from "./reservation.typeorm";
import { UserTypeOrm } from "./user.typeorm";

@Entity("user_reservations")
export class UserReservationTypeOrm {
  @PrimaryColumn("uuid", { name: "user_reservaion_id" })
  readonly id: string;

  @Column("enum", {
    name: "status",
    default: "OWNER",
    enum: ["OWNER", "ACTIVATOR", "GUEST"],
    nullable: false,
  })
  readonly type: "OWNER" | "ACTIVATOR" | "GUEST";

  // Relations
  @Column("uuid", { name: "user_id", nullable: false })
  readonly userId: string;
  @ManyToOne(() => UserTypeOrm)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  readonly user: UserTypeOrm;

  @Column("uuid", { name: "reservation_id", nullable: false })
  readonly reservationId: string;
  @ManyToOne(() => ReservationTypeOrm)
  @JoinColumn({ name: "reservation_id", referencedColumnName: "id" })
  readonly reservation: ReservationTypeOrm;
}
