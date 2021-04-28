import { IsUUID } from "class-validator";

export class ActivateReservationParams {
  @IsUUID()
  public id: string;
}
