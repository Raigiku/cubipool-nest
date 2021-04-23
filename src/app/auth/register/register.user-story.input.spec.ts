import { validate } from "class-validator";
import { ValidatorMessage } from "../../../common/validators/validator.message";
import { FieldsEs } from "../../../common/fields.es";
import { mapValidations } from "../../../common/validators/util";
import { RegisterUserStoryInput } from "./register.user-story.input";

describe("LoginUserStoryInput", () => {
  describe("Username Validation", () => {
    test("ShorterThan10_MustBeLonger", async () => {
      const input = new RegisterUserStoryInput();
      input.username = "";
      const errors = mapValidations(await validate(input)).get("username");
      expect(errors).toContain(
        ValidatorMessage.minLength(FieldsEs.username, 10)
      );
    });

    test("LongerThan50_MustBeShorter", async () => {
      const input = new RegisterUserStoryInput();
      input.username = "x".repeat(51);
      const errors = mapValidations(await validate(input)).get("username");
      expect(errors).toContain(
        ValidatorMessage.maxLength(FieldsEs.username, 50)
      );
    });

    test("DoesNotStartWithU_StudentCodeInvalid", async () => {
      const input = new RegisterUserStoryInput();
      input.username = "a201512005";
      const errors = mapValidations(await validate(input)).get("username");
      expect(errors).toContain(ValidatorMessage.studentCode);
    });

    test("DoesNotHaveYear_StudentCodeInvalid", async () => {
      const input = new RegisterUserStoryInput();
      input.username = "u20a512005";
      const errors = mapValidations(await validate(input)).get("username");
      expect(errors).toContain(ValidatorMessage.studentCode);
    });

    test("Valid_Success", async () => {
      const input = new RegisterUserStoryInput();
      input.username = "u201512005";
      const errors = mapValidations(await validate(input)).get("username");
      expect(errors).toBeUndefined();
    });
  });

  describe("Password Validation", () => {
    test("ShorterThan8_MustBeLonger", async () => {
      const input = new RegisterUserStoryInput();
      input.password = "";
      const errors = mapValidations(await validate(input)).get("password");
      expect(errors).toContain(
        ValidatorMessage.minLength(FieldsEs.password, 8)
      );
    });

    test("LongerThan200_MustBeShorter", async () => {
      const input = new RegisterUserStoryInput();
      input.password = "x".repeat(201);
      const errors = mapValidations(await validate(input)).get("password");
      expect(errors).toContain(
        ValidatorMessage.maxLength(FieldsEs.password, 200)
      );
    });

    test("Valid_Success", async () => {
      const input = new RegisterUserStoryInput();
      input.password = "1234567910";
      const errors = mapValidations(await validate(input)).get("password");
      expect(errors).toBeUndefined();
    });
  });
});
