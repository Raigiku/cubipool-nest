import * as moment from "moment";

export class ActivateReservationUserStoryError {
  static activatorNotFound = "el activador no existe";
  static reservationNotFound = "la reserva no existe";
  static reservationNotPendingActivation =
    "la reserva no está pendiente de activación";
  static notInsideActivationTimeFrame = (ms: number) =>
    `tiene que esperar ${moment.utc(ms).format("HH:mm:ss")}`;
  static reservationActivationTimeFramePassed =
    "ya pasó el tiempo máximo de 10 minutos";
}
