import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { CubicleTypeOrm } from "./cubicle.typeorm";

@Entity("campus")
export class CampusTypeOrm {
  @PrimaryColumn("uuid", { name: "campus_id" })
  readonly id: string;

  @Column("varchar", { name: "name", length: 100, nullable: false })
  readonly name: string;

  // Relations
  @OneToMany(() => CubicleTypeOrm, (entity) => entity.campus)
  readonly cubicles: CubicleTypeOrm[];
}
