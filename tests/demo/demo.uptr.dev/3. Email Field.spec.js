import { test, expect } from '@playwright/test';

test('Email Field', async ({ page }) => {
    await page.goto('https://demo.uptr.dev/auth/register');
    await page.pause();

    //Проверка на видимость
    await expect(page.getByLabel('Email')).toBeVisible()

    //Проверка на возможность ввода
    await expect(page.getByLabel('Email')).toBeEditable()

    //Проверка на корректность ввода (латинские буквы, символы, без @, c @ без домена)

    await page.getByLabel('Email').fill('234234');
    await expect(page.getByText('Please enter a valid email')).toBeVisible()
    await page.getByLabel('Email').fill('123.ru');
    await expect(page.getByText('Please enter a valid email')).toBeVisible()
    await page.getByLabel('Email').fill('123фыв@ya.ru');
    await expect(page.getByText('Please enter a valid email')).toBeVisible()
    await page.getByLabel('Email').fill('123@yan.ru');
    await expect(page.getByText('Please enter a valid email')).toBeHidden()
    await page.getByLabel('Email').fill('!@#%^&*()@ya.ru');
    await expect(page.getByText('Please enter a valid email')).toBeVisible()
    await page.getByLabel('Email').fill('123@!#@yandex.ru');
    await expect(page.getByText('Please enter a valid email')).toBeVisible()
    await page.getByLabel('Email').fill('123@!#@');
    await expect(page.getByText('Please enter a valid email')).toBeVisible()

    //Переход на страницу регистрации
    await page.goto('https://demo.uptr.dev/auth/register');

    //Проверка на видимость
    await expect(page.getByLabel('Email')).toBeVisible()

    //Проверка на возможность ввода
    await expect(page.getByLabel('Email')).toBeEditable()

    //Проверка на корректность ввода (латинские буквы, символы, без @, c @ без домена)

    await page.getByLabel('Email').fill('234234');
    await expect(page.getByText('Please enter a valid email')).toBeVisible()
    await page.getByLabel('Email').fill('123.ru');
    await expect(page.getByText('Please enter a valid email')).toBeVisible()
    await page.getByLabel('Email').fill('123фыв@ya.ru');
    await expect(page.getByText('Please enter a valid email')).toBeVisible()
    await page.getByLabel('Email').fill('123@yan.ru');
    await expect(page.getByText('Please enter a valid email')).toBeHidden()
    await page.getByLabel('Email').fill('!@#%^&*()@ya.ru');
    await expect(page.getByText('Please enter a valid email')).toBeVisible()
    await page.getByLabel('Email').fill('123@!#@yandex.ru');
    await expect(page.getByText('Please enter a valid email')).toBeVisible()
    await page.getByLabel('Email').fill('123@!#@');
    await expect(page.getByText('Please enter a valid email')).toBeVisible()

});