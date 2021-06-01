import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import { PublicationTypeOrm } from "src/persistence/typeorm/entities";
import { Repository } from "typeorm";
import { GetActivePublicationsUserStoryInput } from "./get-active-publications.user-story.input";
import { GetActivePublicationsUserStoryOutput } from "./get-active-publications.user-story.output";

export class GetActivePublicationsUserStory {
  constructor(
    @InjectRepository(PublicationTypeOrm)
    private publicationRepository: Repository<PublicationTypeOrm>
  ) {}

  async execute(
    input: GetActivePublicationsUserStoryInput
  ): Promise<GetActivePublicationsUserStoryOutput[]> {
    const publications = await this.publicationRepository.find({
      relations: [
        "reservation",
        "reservation.cubicle",
        "reservation.cubicle.campus",
      ],
    });
    return publications
      .filter(
        (p) =>
          p.reservation.type === "SHARED" &&
          p.reservation.cubicle.campusId === input.campusId
      )
      .map(
        (p) =>
          ({
            campusName: p.reservation.cubicle.campus.name,
            cubicleCode: p.reservation.cubicle.code,
            publicationDescription: p.description,
            publicationEndTime: p.reservation.endTime,
            publicationId: p.id,
            publicationStartTime: p.startTime,
          } as GetActivePublicationsUserStoryOutput)
      );
  }
}
