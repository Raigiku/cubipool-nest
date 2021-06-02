import { IsUUID } from "class-validator";
import { FieldsEs } from "src/common/fields.es";
import {
  IsDescription,
  IsSharedSeats,
} from "src/common/validators/publication.validator";
import { ValidatorMessage } from "src/common/validators/validator.message";

export class CreatePublicationBody {
  @IsDescription()
  public description: string;
  @IsSharedSeats()
  public sharedSeats: number;
  @IsUUID("4", {
    message: ValidatorMessage.uuid(FieldsEs.reservationId),
  })
  public reservationId: string;
}
