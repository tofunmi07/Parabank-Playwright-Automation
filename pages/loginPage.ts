import { Locator, Page } from "@playwright/test";

export class loginpage {
  page: Page;
  username: Locator;
  password: Locator;
  login: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("//input[@name='username']");
    this.password = page.locator("input[name='password']");
    this.login = page.locator("input[value='Log In']");
  }

  async goto() {
    await this.page.goto("http://localhost:9090/parabank/index.htm");
  }

  async Login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.login.click();
  }
}
