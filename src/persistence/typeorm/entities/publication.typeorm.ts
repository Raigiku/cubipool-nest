import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ReservationTypeOrm } from "./reservation.typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("publications")
export class PublicationTypeOrm {
  @PrimaryColumn("uuid", { name: "publication_id" })
  readonly id: string;

  @Column("varchar", { name: "description", length: 255, nullable: false })
  readonly description: string;

  @Column("integer", { name: "share_seats", nullable: false })
  readonly sharedSeats: number;

  @Column("timestamptz", { name: "start_time", nullable: false })
  readonly startTime: string;

  // Relations
  @Column("uuid", { name: "reservation_id", nullable: false })
  readonly reservationId: string;
  @ManyToOne(() => ReservationTypeOrm)
  @JoinColumn({ name: "reservation_id", referencedColumnName: "id" })
  readonly reservation: ReservationTypeOrm;

  private constructor(
    id: string,
    description: string,
    sharedSeats: number,
    startTime: string,
    reservationId: string,
    reservation: ReservationTypeOrm
  ) {
    this.id = id;
    this.description = description;
    this.sharedSeats = sharedSeats;
    this.startTime = startTime;
    this.reservationId = reservationId;
    this.reservation = reservation;
  }

  static New(
    description: string,
    sharedSeats: number,
    reservationId: string,
    reservation: ReservationTypeOrm
  ) {
    return new PublicationTypeOrm(
      uuidv4(),
      description,
      sharedSeats,
      new Date().toISOString(),
      reservationId,
      reservation
    );
  }
}
