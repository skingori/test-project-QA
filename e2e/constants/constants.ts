export const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD ?? "Password@123";
export const SHORT_PASSWORD = "12345678";
export const DEFAULT_USERNAME = process.env.DEFAULT_USERNAME ?? "testuser";
export const DEMOQA = process.env.DEMOQA ?? "https://demoqa.com";
export const HEADLESS = process.env.HEADLESS === "true" || true;
export const SLOWMO = parseInt(process.env.SLOWMO ?? "0", 10);
export const TIMEOUT = parseInt(process.env.TIMEOUT ?? "30000", 10);
export const VIEWPORT = {
  height: parseInt(process.env.VIEWPORT_HEIGHT ?? "1080", 10),
  width: parseInt(process.env.VIEWPORT_WIDTH ?? "1920", 10),
};
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid username or password!",
  SHORT_PASSWORD_ERROR:
    "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
};
