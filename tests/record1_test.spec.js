import { test, expect } from '@playwright/test';

test('record1_test', async ({ page }) => {
    await page.locator('body').click();
    await page.goto('https://www.autodoc.ru/');
    await page.getByRole('link', { name: 'Личный кабинет' }).click();
    await page.getByPlaceholder('Логин, Телефон или E-mail').click();
    await page.getByPlaceholder('Логин, Телефон или E-mail').fill('KRUS-3063');
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill('798405hrc');
    await page.getByRole('button3', { name: 'Вход' }).click();
});