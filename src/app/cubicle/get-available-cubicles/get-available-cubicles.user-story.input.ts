import { GetAvailableCubiclesUserStoryParams, GetAvailableCubiclesUserStoryQueries } from ".";

export class GetAvailableCubiclesUserStoryInput {
  campusId: string;
  startHour: Date;
  hours: number;

  static fromController(
    params: GetAvailableCubiclesUserStoryParams,
    queries: GetAvailableCubiclesUserStoryQueries
  ): GetAvailableCubiclesUserStoryInput {
    return {
      campusId: params.campusId,
      startHour: new Date(queries.startHour),
      hours: Number(queries.hours),
    };
  }
}
