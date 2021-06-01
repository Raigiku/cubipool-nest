import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import { CubicleTypeOrm } from "src/persistence/typeorm/entities";
import { Repository } from "typeorm";
import { GetAvailableCubiclesUserStoryInput } from "./get-available-cubicles.user-story.input";
import { GetAvailableCubiclesUserStoryOutput } from "./get-available-cubicles.user-story.output";

export class GetAvailableCubiclesUserStory {
  constructor(
    @InjectRepository(CubicleTypeOrm)
    private readonly cubicleRepository: Repository<CubicleTypeOrm>
  ) {}
  async execute(
    input: GetAvailableCubiclesUserStoryInput
  ): Promise<GetAvailableCubiclesUserStoryOutput[]> {
    const cubicles = await this.cubicleRepository.find({
      relations: ["reservations", "campus"],
    });
    const campusCubicles = cubicles.filter(
      (c) => c.campusId === input.campusId
    );
    const availableCubicles = campusCubicles.filter(
      (c) =>
        c.reservations.find((r) => {
          const reservationEndtimeMo = moment(r.endTime);
          const reservationStarttimeMo = moment(r.startTime);
          return (
            (reservationEndtimeMo.isAfter(input.startTime) &&
              reservationEndtimeMo.isSameOrBefore(input.endTime)) ||
            (reservationStarttimeMo.isSameOrAfter(input.startTime) &&
              reservationStarttimeMo.isBefore(input.endTime))
          );
        }) == null
    );
    return availableCubicles.map(
      (c) =>
        ({
          cubicleId: c.id,
          cubicleCode: c.code,
          startTime: input.startTime.toISOString(),
          endTime: input.endTime.toISOString(),
        } as GetAvailableCubiclesUserStoryOutput)
    );
  }
}
