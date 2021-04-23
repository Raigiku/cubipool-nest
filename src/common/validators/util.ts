import { ValidationError } from "class-validator";

export const mapValidations = (validations: ValidationError[]) =>
  new Map(
    validations
      .map((e) => ({
        property: e.property,
        messages: Object.values(e.constraints),
      }))
      .map((i) => [i.property, i.messages])
  );
