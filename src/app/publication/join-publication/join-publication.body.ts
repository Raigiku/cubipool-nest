import { IsUUID } from "class-validator";
import { FieldsEs } from "src/common/fields.es";
import {IsDescription, IsSharedSeats} from "src/common/validators/publication.validator";
import { ValidatorMessage } from "src/common/validators/validator.message";

export class JoinPublicationBody {
    @IsUUID()
    public userId:string;

    @IsUUID('4', {
        message: ValidatorMessage.uuid(FieldsEs.reservationId)
    })
    public reservationId: string;

    @IsUUID()
    public publicationId:string;
}
