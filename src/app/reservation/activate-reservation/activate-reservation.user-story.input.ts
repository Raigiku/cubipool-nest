export class ActivateReservationUserStoryInput {
  reservationId: string;
  activatorId: string;

  constructor(activatorId: string, reservationId: string) {
    this.activatorId = activatorId;
    this.reservationId = reservationId;
  }
}
