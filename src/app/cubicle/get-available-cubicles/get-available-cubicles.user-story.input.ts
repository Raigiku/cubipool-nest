import * as moment from "moment";
import {
  GetAvailableCubiclesUserStoryParams,
  GetAvailableCubiclesUserStoryQueries,
} from ".";

export class GetAvailableCubiclesUserStoryInput {
  campusId: string;
  startTime: moment.Moment;
  hours: number;
  endTime: moment.Moment;

  static fromController(
    params: GetAvailableCubiclesUserStoryParams,
    queries: GetAvailableCubiclesUserStoryQueries
  ): GetAvailableCubiclesUserStoryInput {
    return {
      campusId: params.campusId,
      startTime: moment(new Date(queries.startTime)),
      hours: queries.hours,
      endTime: moment(new Date(queries.startTime)).add(queries.hours, "hours"),
    };
  }
}
