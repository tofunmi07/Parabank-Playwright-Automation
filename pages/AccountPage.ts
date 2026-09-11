import { Page, Locator } from "@playwright/test";

export class NewAccount {
  page: Page;
  openLink: Locator;
  typeAccount: Locator;
  outgoingAccount: Locator;
  openAccountButton: Locator;
  confirmation: Locator;
  newAccountId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openLink = page.getByRole("link", { name: "Open New Account" });
    this.typeAccount = page.locator("//select[@id='type']");
    this.outgoingAccount = page.locator("#fromAccountId");
    this.openAccountButton = page.getByRole("button", {
      name: "Open New Account",
    });
    this.confirmation = page.getByRole("heading", { name: "Account Opened!" });
    this.newAccountId = page.locator("#newAccountId");
  }

  async goto() {
    await this.page.goto("http://localhost:9090/parabank/overview.htm");
  }

  async CreateNewAccount(type: string, outgoing: string) {
    await this.openLink.click();
    await this.typeAccount.selectOption(type);
    await this.outgoingAccount.selectOption(outgoing);
    await this.openAccountButton.click();
  }
}
