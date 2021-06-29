import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PrizeTypeOrm } from "./prize.typeorm";
import { UserTypeOrm } from "./user.typeorm";
import { v4 as uuidv4 } from "uuid";
@Entity("user_prize")
export class UserPrizeTypeOrm {
  @PrimaryColumn("uuid", { name: "user_prize_id" })
  readonly id: string;

  @Column("integer", { name: "quantity", nullable: false })
  readonly quantity: number;

  // Relations
  @Column("uuid", { name: "prize_id", nullable: false })
  readonly prizeId: string;
  @ManyToOne(() => PrizeTypeOrm)
  @JoinColumn({ name: "prize_id", referencedColumnName: "id" })
  readonly prize: PrizeTypeOrm;

  @Column("uuid", { name: "user_id", nullable: false })
  readonly userId: string;
  @ManyToOne(() => UserTypeOrm)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  readonly user: UserTypeOrm;

  static  newUserPrize(
    prizeId:string,
    userId:string
  ):UserPrizeTypeOrm
  {
    return {
      id:uuidv4(),
      quantity:1,
      prizeId:prizeId,
      prize:null,
      userId:userId,
      user:null
    }
  }

}
