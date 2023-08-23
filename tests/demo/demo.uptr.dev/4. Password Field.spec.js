import { test, expect } from '@playwright/test';

test('Password Field', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://demo.uptr.dev/auth/register');

    //await page.pause();
    const Pass = page.getByLabel('Password', { exact: true })
    const RpPass = page.getByLabel('Repeat password')

    //Проверка на видимость
    await expect(Pass).toBeVisible()

    //Проверка на возможность ввода
    await expect(Pass).toBeEditable()

    //Проверка Pass на количество символов и вариантов значений (буквы, знаки)
    await Pass.click();
    await Pass.fill('й'); //1
    await expect(page.getByText('Too short (minimum is 6 characters)')).toBeVisible()
    await Pass.fill('й1'); //2
    await expect(page.getByText('Too short (minimum is 6 characters)')).toBeVisible()
    await Pass.fill('й1G'); //3
    await expect(page.getByText('Too short (minimum is 6 characters)')).toBeVisible()
    await Pass.fill('й1G!'); //4
    await expect(page.getByText('Too short (minimum is 6 characters)')).toBeVisible()
    await Pass.fill('й1G!1'); //5
    await expect(page.getByText('Too short (minimum is 6 characters)')).toBeVisible()
    await Pass.fill('й1G!16'); //6
    await expect(page.getByText('Too short (minimum is 6 characters)')).toBeHidden()
    await Pass.fill('й1G!16d'); //7
    await expect(page.getByText('Too short (minimum is 6 characters)')).toBeHidden()


    //Проверка RpPass при значении Pass=й1G!16d
    await RpPass.click();
    await RpPass.fill('й1G!1');
    await expect(page.getByText('Passwords don\'t match')).toBeVisible()
    await RpPass.fill('й1G!16d');
    await expect(page.getByText('Passwords don\'t match')).toBeHidden()

    await page.pause();
    //await expect(page).toHaveScreenshot('ShowPass.png')
    //await expect(page.getByRole('button', { name: 'Show password' }))

    //await page.getByRole('button', { name: 'Show password' }).click()
    /*await expect(page).toHaveScreenshot('Show password Test.png')
    await page.getByRole('button', { name: 'Hide password' }).click();
    await expect(page).toHaveScreenshot('Hide password Test.png')*/

});


