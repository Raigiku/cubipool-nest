import { IsUsername } from "src/common/validators/user.validator";

export class ActivateReservationBody {
  @IsUsername()
  public activatorUsername: string;
}
