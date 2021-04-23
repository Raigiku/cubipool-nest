import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Unique,
} from "typeorm";

import { CampusTypeOrm } from "./campus.typeorm";
import { ReservationTypeOrm } from "./reservation.typeorm";

@Entity("cubicles")
@Unique(["code", "pavilion", "campusId"])
export class CubicleTypeOrm {
  @PrimaryColumn("uuid", { name: "cubicle_id" })
  readonly id: string;

  @Column("varchar", { name: "code", length: 50, nullable: false })
  readonly code: string;

  @Column("varchar", { name: "description", length: 100, nullable: false })
  readonly description: string;

  @Column("integer", { name: "total_seats", nullable: false })
  readonly totalSeats: number;

  @Column("varchar", { name: "pavilion", length: 100, nullable: false })
  readonly pavilion: string;

  // Relations
  @Column("uuid", { name: "campus_id", nullable: false })
  readonly campusId: string;
  @ManyToOne(() => CampusTypeOrm)
  @JoinColumn({ name: "campus_id", referencedColumnName: "id" })
  readonly campus: CampusTypeOrm;

  @OneToMany(() => ReservationTypeOrm, (entity) => entity.cubicle)
  readonly reservations: ReservationTypeOrm[];
}
