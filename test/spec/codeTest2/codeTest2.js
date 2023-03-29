const { expect } = require("chai");
const moment = require("moment");

//Q1
describe('WebDriver IO Code Test', () => {
        // Question - 1: (50-points)
        /**
         * Testcase: Verify rewards form is empty and Conitnue button is disabled
         * Steps:
         * 1. Launch hotels.com
         *      -Scroll to step 2
         * 2. Click on Learn about Hotels.com Rewards
         * 3. -> Verify Hotels Rewards opened in a new window
         * 4. Click on Join Now
         * 5. -> Verify Form is blank
         * 6. -> Verify Continue button is NOT enabled
         */
        it('Verify rewards form is empty and Conitnue button is disabled', async () => {
    
            //1. Launch hotels.com
            await browser.url('https://www.hotels.com/');
            await browser.pause(2000);
           
            // 2. Click on Learn about Hotels.com Rewards
             //    -Scroll to step 2
            const rewardsSection = await $('a=Learn about Hotels.com Rewards');
            await rewardsSection.scrollIntoView(false);
            await rewardsSection.click();

                // Wait for new window to open
    await browser.waitUntil(async () => {
        const handles = await browser.getWindowHandles();
        return handles.length === 2;
    });

            //3. -> Verify Hotels Rewards opened in a new window
                // Before verifying switch handle
        //switching handles
        const connectedHandle = await browser.getWindowHandle();
        console.log(`connectedHandle -> ${connectedHandle}\n\n`);

        const allHandles = await browser.getWindowHandles();
        console.log(allHandles);

        for (const handle of allHandles) {
                await browser.switchToWindow(handle);
                const currentUrl = await browser.getUrl();
                console.log(`current url -> ${currentUrl}\n\n`);
                if (currentUrl.localeCompare('https://www.hotels.com/hotel-rewards-pillar/hotelscomrewards.html') === 0) {
                    break;
                }
            }

        //Verify Hotels Rewards opened in a new window
            const joinMsglocator = await $('h2=Join to get these benefits');
            const isMsgDisplayed = await joinMsglocator.isDisplayed();
        expect(isMsgDisplayed, 'We are NOT on Hotels Rewards window').to.be.true;
        await browser.pause(2000);
        
        // 4. Click on Join Now 
            const joinNowLocator = await $('a=Join Now');
            await joinNowLocator.click();
           

                // Wait for the Join Now form to load
        const signupForm = await $('h1=Create an account');
        await signupForm.waitForExist();
        
        //5. -> Verify Form is blank
        const emailLocator = await $('#signupFormEmailInput');
        const firstNameLocator = await $('#signupFormFirstNameInput');
        const lastNameLocator = await $('#signupFormLastNameInput');
        const PasswordLocator = await $('#signupFormPasswordInput');
       
        expect(await emailLocator.getValue()).to.be.empty;
        expect(await firstNameLocator.getValue()).to.be.empty;
        expect(await lastNameLocator.getValue()).to.be.empty;
        expect(await PasswordLocator.getValue()).to.be.empty;


       // 6. -> Verify Continue button is NOT enabled
        const continueButton = await $('//button[contains(text(),"Continue")]');
        expect(await continueButton.getAttribute('disabled')).to.be.equal('true');
      
        })

        // Question - 2: (50-points)
    /**
     * Testcase: Verify past dates are disabled in Calendar
     * Steps:
     * 1. Launch hotels.com
     * 2. Click on Dates section
     * 3. If not already, go to current month
     * 4. -> Verify all past dates are disabled
     */
    it.only('Verify past dates are disabled in Calendar', async () => {

        //1. Launch hotels.com
        await browser.url('https://www.hotels.com/');
        await browser.pause(2000);

        //2. Click on Dates section
        const datesElementLocator = await $('button[data-name=date_form_field]');
        datesElementLocator.click();
        browser.pause(3000);
        //3. If not already, go to current month
        const today = moment();
        const currentMonth = today.format('MMMM YYYY');
        const calendarHeader = $('//div[@class="widget-datepicker-label"]');
        while (calendarHeader.getText() !== currentMonth) {
                const nextButton = await $('//button[contains(@class, "widget-datepicker-next")]');
                await nextButton.click();
                await browser.pause(1000); 
              }

    });
})