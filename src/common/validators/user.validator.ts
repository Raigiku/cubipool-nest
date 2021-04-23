import { Transform } from "class-transformer";
import { Matches, MaxLength, MinLength } from "class-validator";
import { FieldsEs } from "../fields.es";
import { ValidatorMessage } from "./validator.message";

export const IsUsername = (): PropertyDecorator => (
  target: any,
  propertyKey: string | symbol
): void => {
  Transform((val) => val.value.toLowerCase())(target, propertyKey);
  MinLength(10, {
    message: ValidatorMessage.minLength(FieldsEs.username, "$constraint1"),
  })(target, propertyKey);
  MaxLength(50, {
    message: ValidatorMessage.maxLength(FieldsEs.username, "$constraint1"),
  })(target, propertyKey);
  Matches(/[uU]20\d\d\w{5,45}/, { message: ValidatorMessage.studentCode })(
    target,
    propertyKey
  );
};

export const IsPassword = (): PropertyDecorator => (
  target: any,
  propertyKey: string | symbol
): void => {
  MinLength(8, {
    message: ValidatorMessage.minLength(FieldsEs.password, "$constraint1"),
  })(target, propertyKey);
  MaxLength(200, {
    message: ValidatorMessage.maxLength(FieldsEs.password, "$constraint1"),
  })(target, propertyKey);
};
