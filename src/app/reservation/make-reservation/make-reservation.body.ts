import { IsDateString, IsUUID } from "class-validator";

export class MakeReservationBody {
  @IsDateString()
  public startTime: string;

  @IsUUID()
  public cubicleId: string;

  @IsDateString()
  public endTime: string;
}
