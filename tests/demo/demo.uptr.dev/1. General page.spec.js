
import { test, expect } from '@playwright/test';

test('General page', async ({ page }) => {
    await page.goto('https://demo.uptr.dev/auth/login');
    await page.pause();
    //Locator:
    //getByLabel('Password')
    //getByLabel('Email')
    //getByRole('button', { name: 'Sign in' })
    //await page.locator (getByRole('button', { name: 'Sign in' }));

        //Проверка титла
    await expect(page).toHaveURL('https://demo.uptr.dev/auth/login')
    await expect(page).toHaveTitle('UpTrader Trading Cabinet')

        //Проверка на видимость
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Couldn\'t confirm email?' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()

        //Проверка видимости и снятия галки Checkbox
    await expect(page.locator('#main-login-form').getByRole('img')).toBeVisible()
    expect (await page.locator('#main-login-form').getByRole('img').isChecked()).toBeFalsy()

        //Проверка на возможность ввода
    await expect(page.getByLabel('Password')).toBeEditable()
    await expect(page.getByLabel('Email')).toBeEditable()

        //Проверка ссылок
    await page.getByRole('link', { name: 'Forgot password?' }).click();
    await page.getByRole('link', { name: 'Back to sign-in' }).click();
    await page.getByRole('link', { name: 'Couldn\'t confirm email?' }).click();
    await page.getByRole('link', { name: 'Back to sign-in' }).click();

        //Проверка выключенной кнопки
    await expect(page.getByRole('button', { name: 'Sign in' })).toHaveAttribute("disabled", "")

        //Проверка включения кнопки

    await page.getByLabel('Email').fill('1232@ya.ru');
    await page.getByLabel('Password').fill('йцуйцу');
    await expect(page.getByRole('button', { name: 'Sign in' })).not.toHaveAttribute("disabled", "")

        //Проверка ссылок регистрация, вход
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click();

});
