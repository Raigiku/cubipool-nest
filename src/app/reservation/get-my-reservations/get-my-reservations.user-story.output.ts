import { UserReservationTypeOrm } from "src/persistence/typeorm/entities";

export class GetMyReservationsUserStoryOutput {
  cubicleCode: string;
  campusName: string;
  startDateTime: string;
  endDateTime: string;
  seats: number;
  type: string;
  reservationId: string;

  static fromUserReservation(
    useReservation: UserReservationTypeOrm
  ): GetMyReservationsUserStoryOutput {
    return {
      cubicleCode: useReservation.reservation.cubicle.code,
      campusName: useReservation.reservation.cubicle.campus.name,
      endDateTime: useReservation.reservation.endTime,
      startDateTime: useReservation.reservation.startTime,
      type: useReservation.reservation.type,
      seats: useReservation.reservation.cubicle.totalSeats,
      reservationId: useReservation.reservationId,
    };
  }
}
