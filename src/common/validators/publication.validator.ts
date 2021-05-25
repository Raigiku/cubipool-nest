import { IsInt, IsPositive, MaxLength, MinLength } from "class-validator";
import { FieldsEs } from "../fields.es";
import { ValidatorMessage } from "./validator.message";

export const IsDescription = (): PropertyDecorator => (
  target: any,
  propertyKey: string | symbol
): void => {
  MinLength(8, {
    message: ValidatorMessage.minLength(FieldsEs.description, "$constraint1"),
  })(target, propertyKey);
  MaxLength(255, {
    message: ValidatorMessage.maxLength(FieldsEs.description, "$constraint1"),
  })(target, propertyKey);
};

export const IsSharedSeats = (): PropertyDecorator => (
  target: any,
  propertyKey: string | symbol
): void => {
  IsPositive({
    message: ValidatorMessage.positiveNumber(FieldsEs.sharedSeats),
  })(target, propertyKey);
  IsInt({
    message: ValidatorMessage.integerNumber(FieldsEs.sharedSeats),
  })(target, propertyKey);
};
