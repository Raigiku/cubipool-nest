export class ValidatorMessage {
  static minLength = (property: string, constraint: any) =>
    `${property} debe tener ${constraint} caracteres o más`;

  static maxLength = (property: string, constraint: any) =>
    `${property} debe tener ${constraint} caracteres o menos`;

  static studentCode = "el código de alumno es inválido";
}
