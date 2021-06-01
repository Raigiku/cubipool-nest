import { Type } from "class-transformer";
import { IsInt, IsISO8601, IsPositive } from "class-validator";

export class GetAvailableCubiclesUserStoryQueries {
  @IsISO8601()
  startTime: Date;
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  hours: number;
}
