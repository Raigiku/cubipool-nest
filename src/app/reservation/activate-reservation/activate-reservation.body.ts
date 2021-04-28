import { IsUUID } from "class-validator";

export class ActivateReservationBody {
  @IsUUID()
  public activatorId: string;
}
