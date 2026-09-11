import { expect, test } from "@playwright/test";
import { loginpage } from "../pages/loginPage";
import { NewAccount } from "../pages/AccountPage";

test("user can login with valid credentials", async ({ page }) => {
  const LoginPage = new loginpage(page);
  await LoginPage.goto();
  await LoginPage.Login("testuser1", "Password1!");

  await expect(
    page.getByRole("heading", { name: "Accounts Overview" }),
  ).toBeVisible();
});

test("user can login with invalid credentials", async ({ page }) => {
  const LoginPage = new loginpage(page);
  await LoginPage.goto();
  await LoginPage.Login("testuser1", "qwerty!");

  await expect(page.getByRole("heading", { name: "Error!" })).toBeVisible();
});

test("user can open a new account", async ({ page }) => {
  const LoginPage = new loginpage(page);
  const OpenAccount = new NewAccount(page);

  await LoginPage.goto();
  await LoginPage.Login("testuser1", "Password1!");

  await OpenAccount.goto();
  await OpenAccount.CreateNewAccount("SAVINGS", "13566");

  //await expect(OpenAccount.confirmation).toBeVisible();
  const newAccountNumber = await OpenAccount.newAccountId.textContent();
  console.log("This is the new account", newAccountNumber);
});
