import { IsDate, IsDateString } from "class-validator";

export class GetAvailableCubiclesUserStoryInput {
  campusId: string;
  @IsDateString()
  startHour: string;
  hours: number;
  get startHourDatetime(){
    return new Date(this.startHour);
  } 
}
