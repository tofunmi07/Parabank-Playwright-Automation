import { Locator, Page } from "@playwright/test";

export class TransferFunds {
  page: Page;
  amount: Locator;
  from: Locator;
  to: Locator;
  transferButton: Locator;
  confirmation: Locator;
  balance: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amount = page.locator("#amount");
    this.from = page.locator("#fromAccountId");
    this.to = page.locator("#toAccountId");
    this.transferButton = page.locator("//input[@value='Transfer']");
    this.confirmation = page.getByRole("heading", {
      name: "Transfer Complete!",
    });
    this.balance = page.locator("//tbody/tr[1]/td[2]");
  }

  async goto() {
    await this.page.goto("http://localhost:9090/parabank/transfer.htm");
  }

  async Transfer(amount: string, from: string, to: string) {
    await this.amount.fill(amount);
    await this.from.selectOption(from);
    await this.to.selectOption(to);
    await this.transferButton.click();
  }
}
