import * as moment from "moment";

export class CancelReservationUserStoryError {
  static reservationDoesNotExist = "La reservation no existe";
  static cubicleNotFound = "el cubiculo no existe";
  static userNotFound = "El usuario no existe";
  static notEnoughPrivilege = "No tienes los permisos necesarios para realizar esta accion";
}
