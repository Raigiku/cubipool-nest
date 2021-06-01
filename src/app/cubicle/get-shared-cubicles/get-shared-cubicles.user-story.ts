import { InjectRepository } from "@nestjs/typeorm";
import { CubicleTypeOrm } from "src/persistence/typeorm/entities";
import { Repository } from "typeorm";
import { GetSharedCubiclesUserStoryOutput } from './get-shared-cubicles.user-story.output';

export class GetSharedCubiclesUserStory{
    constructor(
        @InjectRepository(CubicleTypeOrm)
        private readonly cubicleRepository: Repository<CubicleTypeOrm>
    ){}

    async execute () : Promise<GetSharedCubiclesUserStoryOutput[]>{
        const cubicles = await this.cubicleRepository.find();
        return cubicles.map((cubicles)=>({
            id: cubicles.id} as GetSharedCubiclesUserStoryOutput));
    }
}