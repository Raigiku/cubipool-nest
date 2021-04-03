import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ReservationTypeOrm } from "./reservation.typeorm";

@Entity("publications")
export class PublicationTypeOrm {
  @PrimaryColumn("uuid", { name: "publication_id" })
  readonly id: string;

  @Column("varchar", { name: "description", length: 255, nullable: false })
  readonly description: string;

  @Column("integer", { name: "share_seats", nullable: false })
  readonly sharedSeats: number;

  // Relations
  @Column("uuid", { name: "reservation_id", nullable: false })
  readonly reservationId: string;
  @ManyToOne(() => ReservationTypeOrm)
  @JoinColumn({ name: "reservation_id", referencedColumnName: "id" })
  readonly reservation: ReservationTypeOrm;
}
