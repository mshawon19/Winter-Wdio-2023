// Md Shawon's Homework-1

const { expect } = require("chai");

// TC-1: Verify current temp is less than or equals to feel-like temp
/**
 * 1. Launch https://www.accuweather.com/
 * 2. Verify current-temp is in between 45 and 55
 */

it('Verify current temp is less than or equals to feel-like temp', async() =>{
//1. Launch https://www.accuweather.com/
await browser.url('https://www.accuweather.com/');


//2. Verify current-temp is in between 45 and 55
/*
currentTemp >= 45 && currentTemp <= 55
*/
const currentTempElement = await $('//span[@class="recent-location-temp"]');
let currentTempText = await currentTempElement.getText();            // current temp is 38
currentTempText = currentTempText.trim();                                  
let currentTemp = currentTempText.substring(0,currentTempText.length-1);    
currentTemp = Number(currentTemp);  

expect(currentTemp >= 45 && currentTemp <= 55).to.be.true;
})


// TC-2: Verify error on empty login flow
/**
 * 1. Launch https:www.facebook.com/
 * 2. Click 'Log In' button
 * //button[contains(@data-testid, "al_log")]
 * 3. Verify error msg is displayed
 *      The email or mobile number you entered isn’t connected to an account
 */

it('Verify error on empty login flow', async() =>{
//1. Launch https:www.facebook.com/
await browser.url('https://www.facebook.com/');
await browser.pause(1000);
//2. Click 'Log In' button
const logInClick = await $('//button[contains(@data-testid, "al_log")]')
await logInClick.click();
await browser.pause(1000);
//3. Verify error msg is displayed
    //The email or mobile number you entered isn’t connected to an account
//Using partial text value //div[contains(text(), 'email or mobile')]
const errorDisplayMsg = await $('//div[contains(text(), "email or mobile")]')
const isErrorMsgDisplayed = await errorDisplayMsg.isDisplayed();

expect (isErrorMsgDisplayed, 'We are not on Log Into Facebook Page.').to.be.true;

})

// TC-3: Verify the empty messenger login flow
/**
 * 1. Launch https:www.facebook.com/ -Done
 * 2. Click on 'Messenger' link -Done
 * 3. Verify 'Keep me signed in' checkbox is NOT selected -Done
 * 4. Click 'Log In' button -Done
 * 5. Verify link -> "Find your account and log in" is displayed -Done
 * 6. Verify 'Continue' button is enabled -Done
 * 7. Verify 'Keep me signed in' checkbox is NOT selected -Done
 * 8. Click 'Keep me signed in' checkbox -
 * 9. Verify 'Keep me signed in' checkbox is selected
 * 
 */

it.only('Verify the empty messenger login flow', async() =>{
    //1. Launch https:www.facebook.com/
await browser.url('https://www.facebook.com/');
await browser.pause(2000);
//2. Click on 'Messenger' link
const clickOnMessenger = await $('=Messenger');
await clickOnMessenger.click();
await browser.pause(2000);
//3. Verify 'Keep me signed in' checkbox is NOT selected
const keepMySignedInBox= await $('input[type=checkbox]');
const keepMySignedInNotSel = await keepMySignedInBox.isSelected();
await browser.pause(2000);
expect(keepMySignedInNotSel, 'Keep Me Singed In Is Selected').to.be.false;
//4. Click 'Log In' button
await browser.pause(2000);
const clickLogIn = await $('#loginbutton');
await clickLogIn.click();
await browser.pause(2000);
//5. Verify link -> "Find your account and log in" is displayed
const locatingLink = await $('*=your account');
const isLinkDisplayed = await locatingLink.isDisplayed();
expect (isLinkDisplayed, 'Find your account and log in link is not displayed').to.be.true;

await browser.pause(2000);
//6. Verify 'Continue' button is enabled
const locatingContinueButton = await $('button*=tinue')
const isContinueBttnEnabled = await locatingContinueButton.isEnabled();
expect(isContinueBttnEnabled, 'Continue button is NOT enabled').to.be.true;

await browser.pause(2000);
//7. Verify 'Keep me signed in' checkbox is NOT selected
const locatingCheckBox = await $('//input[starts-with(@name, "persis")]');
const isCheckboxSelected = await locatingCheckBox.isSelected();

expect(isCheckboxSelected, 'Keep me signed in checkbox IS selected').to.be.false;

//8. Click 'Keep me signed in' checkbox

await browser.pause(2000);
const checkBox = await $('(//span)[1]');
await checkBox.click();

await browser.pause(2000);
//9. Verify 'Keep me signed in' checkbox is selected
const findingCheckBox = await $('//input[starts-with(@name, "persis")]');
const isBoxSelected = await findingCheckBox.isSelected();

expect(isBoxSelected, 'Keep me signed in checkbox is NOT selected').to.be.true;
})