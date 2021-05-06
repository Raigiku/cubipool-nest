import { Type } from "class-transformer";
import { IsInt, IsISO8601, IsPositive } from "class-validator";

export class GetAvailableCubiclesUserStoryQueries {
  @IsISO8601()
  startHour: string;
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  hours: number;
}
