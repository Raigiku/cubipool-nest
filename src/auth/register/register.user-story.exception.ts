import { HttpException, HttpStatus } from "@nestjs/common";

export class RegisterUserStoryException {
  static usernameFound = new HttpException(
    "El nombre de usuario ya existe",
    HttpStatus.BAD_REQUEST
  );
}
