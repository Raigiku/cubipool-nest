import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserPrizeTypeOrm } from "./user-prize.typeorm";

@Entity("prize")
export class PrizeTypeOrm {
  @PrimaryColumn("uuid", { name: "prize_id" })
  readonly id: string;

  @Column("varchar", { name: "name", length: 100, nullable: false })
  readonly name: string;

  @Column("varchar", { name: "description", length: 100, nullable: false })
  readonly description: string;

  @Column("integer", { name: "points_needed", nullable: false })
  readonly pointsNeeded: number;

  @Column("varchar", { name: "image_url", nullable: false })
  readonly imageUrl: string;

  // Relations
  @OneToMany(() => UserPrizeTypeOrm, (entity) => entity.prize)
  readonly userPrizes: UserPrizeTypeOrm[];
}
