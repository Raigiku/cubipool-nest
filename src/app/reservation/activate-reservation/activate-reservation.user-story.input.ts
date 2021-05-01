export class ActivateReservationUserStoryInput {
  reservationId: string;
  activatorUsername: string;

  constructor(activatorId: string, reservationId: string) {
    this.activatorUsername = activatorId;
    this.reservationId = reservationId;
  }
}
