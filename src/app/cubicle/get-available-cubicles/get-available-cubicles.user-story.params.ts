import { IsUUID } from "class-validator";

export class GetAvailableCubiclesUserStoryParams {
  @IsUUID()
  campusId: string;
}
