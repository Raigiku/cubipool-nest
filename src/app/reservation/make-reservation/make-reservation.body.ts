import { IsDateString, IsUUID } from "class-validator";

export class MakeReservationBody {

  @IsDateString()
  public startTime:string
  
  @IsUUID()
  public cubicleId:string

  @IsUUID()
  public userId:string


}
