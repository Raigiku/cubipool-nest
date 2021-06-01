export class ValidatorMessage {
  static minLength = (property: string, constraint: any) =>
    `${property} debe tener ${constraint} caracteres o más`;

  static maxLength = (property: string, constraint: any) =>
    `${property} debe tener ${constraint} caracteres o menos`;

  static studentCode = "el código de alumno es inválido";

  static positiveNumber = (property: string) =>
    `${property} debe ser un número positivo`;

  static integerNumber = (property: string) =>
    `${property} debe ser un número entero`;

  static uuid = (property: string) => `${property} debe ser un uuid`;
}
