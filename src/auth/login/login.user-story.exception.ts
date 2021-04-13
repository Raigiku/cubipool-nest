import { HttpException, HttpStatus } from "@nestjs/common";

export class LoginUserStoryException {
  static usernameOrPasswordNotFound = new HttpException(
    "Nombre de usuario o contraseña equivocada",
    HttpStatus.BAD_REQUEST
  );
}
