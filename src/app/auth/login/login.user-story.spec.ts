import { LoginUserStoryError } from ".";
import { LoginUserStory } from "./login.user-story";
import { LoginUserStoryInput } from "./login.user-story.input";

describe("LoginUserStory", () => {
  let userRepository: any;
  let jwtService: any;

  beforeEach(() => {
    userRepository = { findOne: jest.fn() };
    jwtService = { sign: jest.fn() };
  });

  test("UsernameNotFound", async () => {
    userRepository.findOne.mockReturnValue(null);
    const loginUserStory = new LoginUserStory(userRepository, jwtService);
    const input: LoginUserStoryInput = { username: "ds", password: "ds" };
    try {
      await loginUserStory.execute(input);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response.errors).toContain(
        LoginUserStoryError.usernameOrPasswordNotFound
      );
    }
  });

  test("PasswordsDontMatch", async () => {
    const foundUser = {
      password: "$2a$10$pfS.atOQfPqqhrVXAMZcF.wB0h64/hv0xueG.vT2/waziS0p9f46a",
    }; // testpassword123
    userRepository.findOne.mockReturnValue(foundUser);
    const loginUserStory = new LoginUserStory(userRepository, jwtService);
    const input: LoginUserStoryInput = {
      username: "",
      password: "testpassword1234",
    };
    try {
      await loginUserStory.execute(input);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response.errors).toContain(
        LoginUserStoryError.usernameOrPasswordNotFound
      );
    }
  });

  test("UserLoggedIn", async () => {
    const foundUser = {
      password: "$2a$10$pfS.atOQfPqqhrVXAMZcF.wB0h64/hv0xueG.vT2/waziS0p9f46a",
    }; // testpassword123
    userRepository.findOne.mockReturnValue(foundUser);
    const loginUserStory = new LoginUserStory(userRepository, jwtService);
    const input: LoginUserStoryInput = {
      username: "",
      password: "testpassword123",
    };
    await loginUserStory.execute(input);
  });
});
