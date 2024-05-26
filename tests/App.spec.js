const {userEmail, userPassword, fakeEmail, fakePassword} = require("./user.js");

const { test, expect } = require("@playwright/test");

test("Успешная авторизация", async ({ page }) => {
    // Go to https://netology.ru/
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();

  await page.getByPlaceholder('Email').fill(userEmail);
  await page.getByPlaceholder('Пароль').fill(userPassword);
  // Click [data-testid="login-submit-btn"]
  await page.getByTestId('login-submit-btn').click();

  await expect(page).toHaveURL(
    RegExp("https://netology.ru/profile/") //5836373
  );

  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('load');

  await expect(page).toHaveTitle("Моё обучение");
  await expect(page.locator("h2")).toContainText("Моё обучение");
});


test("Неуспешная авторизация", async ({ page }) => {
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();

  await page.getByPlaceholder('Email').fill(userEmail);
  await page.getByPlaceholder('Пароль').fill(fakePassword);
  await page.getByTestId('login-submit-btn').click();

  await expect(page.getByTestId('login-error-hint')).toContainText('Вы ввели неправильно логин или пароль');

  await page.getByPlaceholder('Email').fill(fakeEmail);
  await page.getByPlaceholder('Пароль').fill(userPassword);
  await page.getByTestId('login-submit-btn').click();

  await expect(page.getByTestId('login-error-hint')).toContainText('Вы ввели неправильно логин или пароль');
});
