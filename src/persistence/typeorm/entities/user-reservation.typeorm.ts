import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ReservationTypeOrm } from "./reservation.typeorm";
import { UserTypeOrm } from "./user.typeorm";
import { v4 as uuidv4 } from "uuid";

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

  static newActivator(
    user: UserTypeOrm,
    reservation: ReservationTypeOrm
  ): UserReservationTypeOrm {
    return {
      id: uuidv4(),
      reservation: reservation,
      reservationId: reservation.id,
      type: "ACTIVATOR",
      user: user,
      userId: user.id,
    };
  }

  static newHost(
    userId: string,
    reservationId: string
  ): UserReservationTypeOrm {
    return {
      id: uuidv4(),
      reservation: null,
      reservationId: reservationId,
      type: "OWNER",
      user: null,
      userId: userId,
    };
  }

  static newGuest(
    userId: string,
    reservationId: string
  ): UserReservationTypeOrm {
    return {
      id: uuidv4(),
      reservation: null,
      reservationId: reservationId,
      type: "GUEST",
      user: null,
      userId: userId,
    };
  }

  static types() {
    return ["OWNER", "ACTIVATOR", "GUEST"];
  }

  static get ownerType() {
    return "OWNER";
  }
}
