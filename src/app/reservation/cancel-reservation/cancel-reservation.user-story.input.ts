export class CancelReservationUserStoryInput {
  userId: string;
  reservationId: string;
  constructor(
    userId: string,
    reservationId: string,
  ) {
    this.reservationId = reservationId;
    this.userId = userId;
  }
}
