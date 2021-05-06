import { InjectRepository } from "@nestjs/typeorm";
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
    const inputEndDatetime = new Date(input.startHour);
    inputEndDatetime.setDate(inputEndDatetime.getDate() + input.hours);
    const inputMidDatetime = new Date(input.startHour.getHours() + 1);

    const availableCubicles = campusCubicles.filter(
      (c) =>
        c.reservations.find(
          (r) =>
            (new Date(r.startTime) === input.startHour &&
              (new Date(r.endTime) === inputEndDatetime).toString()) ||
            (new Date(r.startTime) === input.startHour &&
              (new Date(r.startTime) === inputMidDatetime).toString())
        ) == null
    );
    return availableCubicles.map(
      (c) =>
        ({
          cubicleId: c.id,
          cubicleCode: c.code,
          startTime: input.startHour.toISOString(),
          endTime: inputEndDatetime.toISOString(),
        } as GetAvailableCubiclesUserStoryOutput)
    );
  }
}
