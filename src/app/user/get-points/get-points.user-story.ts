import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PointsRecordTypeOrm } from "src/persistence/typeorm/entities";
import { Repository } from "typeorm";
import { GetPointsUserStoryInput } from "./get-points.user-story.input";
import { GetPointsUserStoryOutput } from "./get-points.user-story.output";

@Injectable()
export class GetPointsUserStory {
  constructor(
    @InjectRepository(PointsRecordTypeOrm)
    readonly pointsRecordRepository: Repository<PointsRecordTypeOrm>
  ) {}

  async execute(
    input: GetPointsUserStoryInput
  ): Promise<GetPointsUserStoryOutput[]> {
    const pointsRecord = await this.pointsRecordRepository.find({
      where: { userId: input.userId },
    });
    return pointsRecord.map((p) => ({
      name: p.message,
      points: p.points,
      date: p.createdAt,
    }));
  }
}
