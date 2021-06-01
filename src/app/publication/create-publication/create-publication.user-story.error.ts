export class CreatePublicationUserStoryError {
  static userDoesntExist = "el usuario no existe";
  static reservationDoesntExist = "la reserva no existe";
  static userIsntOwner = "el usuario no es el dueño de la reserva";
  static reservationIsntActive = "la reserva no está activa";
  static reservationAlreadyHasPublications =
    "la reserva ya tiene publicaciones";
}
