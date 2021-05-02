import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { ReservationTypeOrm } from "src/persistence/typeorm/entities';
import { Repository } from "typeorm";
import { GetAllReservationUserStoryOutput } from './get-all-reservation.user-story,output';

@Injectable()
export class GetAllReservationUserStory{
    constructor(
        @InjectRepository(ReservationTypeOrm)
        private readonly reservationRepository: Repository<ReservationTypeOrm>,
    ){}

    async findAll():  Promise<GetAllReservationUserStoryOutput[]>{
        return this.reservationRepository.find({deleted_at: null});
    }
}