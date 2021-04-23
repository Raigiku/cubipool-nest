import { InjectRepository } from "@nestjs/typeorm";
import { CampusTypeOrm } from "src/persistence/typeorm/entities";
import { Repository } from "typeorm";
import { GetAllCampusesUserStoryOutput } from "./get-all-campuses.user-story.output";

export class GetAllCampusesUserStory {
  constructor(
    @InjectRepository(CampusTypeOrm)
    private readonly campusRepository: Repository<CampusTypeOrm>
  ) {}

  async execute(): Promise<GetAllCampusesUserStoryOutput[]> {
    const campuses = await this.campusRepository.find();
    campuses.map(campus=>{})
    return null;
  }
}