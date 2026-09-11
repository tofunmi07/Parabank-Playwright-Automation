import { expect, test } from "@playwright/test";
import { loginpage } from "../pages/loginPage";
import { TransferFunds } from "../pages/TransferPage";

test("user can transfer funds with people", async ({ page }) => {
  const LoginPage = new loginpage(page);
  const Transferfunds = new TransferFunds(page);

  await LoginPage.goto();
  await LoginPage.Login("testuser1", "Password1!");

  await Transferfunds.goto();
  await Transferfunds.Transfer("120", "13566", "13677");

  await expect(Transferfunds.confirmation).toHaveText("Transfer Complete!");
});

test("transfer correctly reduces account balance", async ({ page }) => {
  const LoginPage = new loginpage(page);
  const Transferfunds = new TransferFunds(page);

  await LoginPage.goto();
  await LoginPage.Login("testuser1", "Password1!");

  //read the balance before transfer
  await page.goto("http://localhost:9090/parabank/overview.htm");
  const balanceText = await page
    .locator("#accountTable tbody tr td:nth-child(2)")
    .first()
    .textContent();
  const startingBalance = parseFloat(
    balanceText!.replace("$", "").replace(",", ""),
  );

  //do the transfer
  await Transferfunds.goto();
  await Transferfunds.Transfer("120", "13566", "13677");
  await expect(Transferfunds.confirmation).toBeVisible();
  await page.screenshot({ path: "after-transfer.png" });

  //read the balance after
  await page.goto("http://localhost:9090/parabank/overview.htm");
  const newbalanceText = await page
    .locator("#accountTable tbody tr td:nth-child(2)")
    .first()
    .textContent();
  const newBalance = parseFloat(
    newbalanceText!.replace("$", "").replace(",", ""),
  );

  await expect(newBalance).toBe(startingBalance - 120);
});
