import { isUUID } from "class-validator";
import { UserTypeOrm } from "src/persistence/typeorm/entities";
import { RegisterUserStoryError } from ".";
import { RegisterUserStory } from "./register.user-story";
import { RegisterUserStoryInput } from "./register.user-story.input";

describe("RegisterUserStory", () => {
  let userRepository: any;

  beforeEach(() => {
    userRepository = { findOne: jest.fn(), save: jest.fn() };
  });

  test("DuplicateUsername", async () => {
    const foundUser = {};
    userRepository.findOne.mockReturnValue(foundUser);
    const loginUserStory = new RegisterUserStory(userRepository);
    const input: RegisterUserStoryInput = { username: "", password: "" };
    try {
      await loginUserStory.execute(input);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response.errors).toContain(
        RegisterUserStoryError.usernameExists
      );
    }
  });

  test("UserRegistered", async () => {
    userRepository.findOne.mockReturnValue(null);
    userRepository.save.mockReturnValue();
    const loginUserStory = new RegisterUserStory(userRepository);
    const input: RegisterUserStoryInput = { username: "", password: "" };
    const output = await loginUserStory.execute(input);
    expect(isUUID(output.id)).toBeTruthy();
    expect(output.maxHoursPerDay).toBe(2);
    expect(output.username).toBe(input.username);
    expect(output.points).toBe(0);
  });
});
