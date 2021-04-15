import { Transform } from "class-transformer";
import { Matches, MaxLength, MinLength } from "class-validator";

export const IsUsername = (): PropertyDecorator => (
  target: any,
  propertyKey: string | symbol
): void => {
  Transform((val) => val.value.toLowerCase())(target, propertyKey);
  MinLength(10)(target, propertyKey);
  MaxLength(50)(target, propertyKey);
  Matches(/[uU]20\d\d\w{5,45}/)(target, propertyKey);
};

export const IsPassword = (): PropertyDecorator => (
  target: any,
  propertyKey: string | symbol
): void => {
  MinLength(8)(target, propertyKey);
  MaxLength(200)(target, propertyKey);
};
