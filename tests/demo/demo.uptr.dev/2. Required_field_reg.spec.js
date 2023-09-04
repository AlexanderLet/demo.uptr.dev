import { test, expect } from '@playwright/test';

test('Required_field_reg', async ({page}) => {
        await page.goto('https://demo.uptr.dev/auth/register');


        //Locator error Const
        const FirstNameError = page.locator('.ReduxTextField__error > span').first()
        const LastNameError = page.locator('div:nth-child(2) > div > .ReduxTextField__error > span').first()
        const EmailError = page.locator('div:nth-child(3) > div > .ReduxTextField__error > span')
        const PhoneError = page.locator('input[name="phone"]')
        const PassError = page.locator('div:nth-child(5) > div > div > .ReduxTextField__error > span').first()
        const RpPassError = page.locator('div:nth-child(5) > div:nth-child(2) > div > .ReduxTextField__error > span')

        //Button Registration Enable Test
        //await expect(page.getByRole('button', { name: 'Register' })).not.toHaveAttribute("disabled", "") //enable
        //Button Registration Disable Test
        //await expect(page.getByRole('button', { name: 'Register' })).toHaveAttribute("disabled", "") //disable

        //CheckBox
        const TermsOfBusiness =  page.locator('div').filter({ hasText: /^Terms of Business$/ }).getByRole('img')
        const DemoTOS = page.locator('div').filter({ hasText: /^Demo TOS$/ }).locator('span')
        const HighNetIndividual = page.locator('div').filter({ hasText: /^High net individual$/ }).getByRole('img')


        /**
         * Locator error
         * First name:  locator('.ReduxTextField__error > span').first()
         * Last name: locator('div:nth-child(2) > div > .ReduxTextField__error > span').first()
         * Email: locator('div:nth-child(3) > div > .ReduxTextField__error > span')
         * Phone: locator('input[name="phone"]')
         * Pass: locator('div:nth-child(5) > div > div > .ReduxTextField__error > span').first()
         * RpPass: locator('div:nth-child(5) > div:nth-child(2) > div > .ReduxTextField__error > span')
         * Button Registration: getByRole('button', { name: 'Register' })
         */

        /**
         * Locator field
         * page.getByLabel('First name')
         * page.getByLabel('Last name')
         * page.getByLabel('Email')
         * phone number: page.locator('input[name="phone"]')
         * page.getByLabel('Password', { exact: true })
         * page.getByLabel('Repeat password')
         * page.getByRole('button', { name: 'I have a partner code' })
         * page.getByLabel('Partner code')
         * page.getByRole('button', {name: 'I don`t have a partner code'})
         * getByRole('button', { name: 'Register' })
         * CHECKBOX
         * page.locator('div').filter({ hasText: /^Terms of Business$/ }).getByRole('img')
         * page.locator('div').filter({ hasText: /^Demo TOS$/ }).locator('span')
         * page.locator('div').filter({ hasText: /^High net individual$/ }).getByRole('img')
         */


        //Проверка на видимость и неактивность регистрации
        await expect(page.getByLabel('First name')).toBeVisible()
        await expect(page.getByLabel('Last name')).toBeVisible()
        await expect(page.getByLabel('Email')).toBeVisible()
        await expect(page.locator('input[name="phone"]')).toBeVisible()
        await expect(page.getByLabel('Password', { exact: true })).toBeVisible()
        await expect(page.getByLabel('Repeat password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'I have a partner code' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Register' })).toBeVisible()


        await expect(page.getByRole('button', { name: 'Register' })).toHaveAttribute("disabled", "") //disable
        expect (await page.locator('div').filter({ hasText: /^Terms of Business$/ }).getByRole('img').isChecked()).toBeFalsy()
        expect (await page.locator('div').filter({ hasText: /^Demo TOS$/ }).locator('span').isChecked()).toBeFalsy()
        expect (await page.locator('div').filter({ hasText: /^High net individual$/ }).getByRole('img').isChecked()).toBeFalsy()

        //Проверка обязательности  всех полей

        await page.getByLabel('First name').fill('Alex')
        await page.getByLabel('Last name').fill('Let')
        await page.getByLabel('Email').fill('123@ya.ru')
        await page.locator('input[name="phone"]').fill('79042001482')
        await page.getByLabel('Password', { exact: true }).fill('123456')
        await page.getByLabel('Repeat password').fill('123456')
        await TermsOfBusiness.click();
        await DemoTOS.click();
        await HighNetIndividual.click();
        await expect(page.getByRole('button', { name: 'Register' })).not.toHaveAttribute("disabled", "") //disable


        //Проверка обязательности First name
        await page.getByLabel('First name').fill('')
        await expect(page.getByRole('button', { name: 'Register' })).toHaveAttribute("disabled", "") //disable
        await expect(FirstNameError).toBeVisible()

       //Проверка обязательности Last name
        await page.getByLabel('First name').fill('Alex')
        await page.getByLabel('Last name').fill('')
        await expect(LastNameError).toBeVisible()
        await expect(page.getByRole('button', { name: 'Register' })).toHaveAttribute("disabled", "") //disable

        //Проверка обязательности Email
        await page.getByLabel('Last name').fill('Let')
        await page.getByLabel('Email').fill('')
        await expect(EmailError).toBeVisible()
        await expect(page.getByRole('button', { name: 'Register' })).toHaveAttribute("disabled", "") //enable

        //Проверка обязательности Phone
        await page.getByLabel('Email').fill('123@ya.ru')
        await page.locator('input[name="phone"]').fill('')
        await expect(PhoneError).toBeVisible()
        await expect(page.getByRole('button', { name: 'Register' })).toHaveAttribute("disabled", "") //disable

        //Проверка обязательности Password
        await page.getByLabel('Password', { exact: true }).fill('')
        await page.locator('input[name="phone"]').fill('79042001482')
        await expect(PassError).toBeVisible()
        await expect(page.getByRole('button', { name: 'Register' })).toHaveAttribute("disabled", "") //disable

        //Проверка обязательности Password repeat
        await page.getByLabel('Password', { exact: true }).fill('123456')
        await page.getByLabel('Repeat password').fill('')
        await expect(RpPassError).toBeVisible()
        await expect(page.getByRole('button', { name: 'Register' })).toHaveAttribute("disabled", "") //disable


        //Проверка Кнопок регистрации при отключении чек-бокса
        // TermsOfBusiness
        await page.getByLabel('Repeat password').fill('123456')
        await TermsOfBusiness.setChecked(false)
        await expect(page.getByRole('button', { name: 'Register' })).toHaveAttribute("disabled", "") //disable

        //Проверка при отключение CheckBox DemoTOS
        await TermsOfBusiness.setChecked(true)
        await DemoTOS.setChecked(false)
        await expect(page.getByRole('button', { name: 'Register' })).toHaveAttribute("disabled", "") //disable

        //Проверка при отключение CheckBox HighNetIndividual
        await DemoTOS.setChecked(true)
        await HighNetIndividual.setChecked(false)
        await expect(page.getByRole('button', { name: 'Register' })).toHaveAttribute("disabled", "") //disable

        //await page.pause();

        await HighNetIndividual.setChecked(true)
        await expect(page.getByRole('button', { name: 'Register' })).not.toHaveAttribute("disabled", "") //disable




});


