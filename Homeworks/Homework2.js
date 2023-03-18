//MD Shawon's Homework 2

const { expect } = require("chai");
const moment = require("moment");
// TC-1: Verify the current date is select by default in Sign Up dropdown
/**
 * 1. Launch facebook.com
 * 2. Click on Create New Account button
 * 3. Verify current date is displayed in the birthdate dropdowns.
 */
// Hint:
/**
 * get current date using moment-library - A
 * get default date selected in the dropdown - B
 * expect(A, '').to.equals(B)
 * 
 */
/*
Have to use format() to get the current date to be displayed the way it is displayed on facebook
    Month
        Mar - MMM
    Date
        16 - D
    Year 
        2023 - YYYY
*/

it('Verify the current date is select by default in Sign Up dropdown', async() =>{
//1. Launch https:www.facebook.com/
await browser.url('https://www.facebook.com/');
await browser.pause(1000);

//2. Click on Create New Account button
const createNewAccount = await $('//a[starts-with(text(),"Create")]');
await createNewAccount.click();
await browser.pause(3000);

// 3. Verify current date is displayed in the birthdate dropdowns.

//Moment library code for current date displayed in the order we need it.
const currentMonth = moment().format('M').toString();
const currentDay = moment().format('D').toString();
const currentYear = moment().format('YYYY').toString();


//Facebook code for current date on D-O-B dropdown.
const currentDOBMonth = await $('//select[@aria-label="Month"]');
await browser.pause(1000);
const currentDOBDay = await $('//select[@aria-label="Day"]');
await browser.pause(1000);
const currentDOBYear = await $('//select[@aria-label="Year"]');
await browser.pause(1000);

const displayedMonth = await currentDOBMonth.getValue();
const displayedDay = await currentDOBDay.getValue();
const displayedYear = await currentDOBYear.getValue();


const currentDate = `${currentMonth}/${currentDay}/${currentYear}`;
const currentDOBDisplayed = `${displayedMonth}/${displayedDay}/${displayedYear}`;

expect(currentDOBDisplayed, 'Code is NOT working').to.equal(currentDate);
})

// TC-2: Verify the travelers count on homepage
/**
 * 1. Launch hotels.com
 * 2. Make Adults=4 in Room-1
 * 3. Click Add another room
 * 4. Make Adults=3 in Room-2
 * 5. Click on Done button
 * 6. Verify total-travalers is equals to the number of adults mentioned in rooms
 * 
 */

it.only('Verify the travelers count on homepage', async() => {
//1. Launch https:www.hotels.com/
    await browser.url('https://hotels.com/');
    await browser.pause(1000);
//2. Make Adults=4 in Room-1
    //2a. Find the path for Travelers Box and Click it.
    const TravelersBox = await $('//button[@data-stid="open-room-picker"]');
    await TravelersBox.click();
    await browser.pause(1000);


    //2b. Find the add Adults in the Travelrs Box and Add 2 more by clicking the (+) icon twice to add upto adults=4

const add4Adults = await $('//input[contains(@aria-label, "Adu")]/following-sibling::button');
await add4Adults.click(); //3
await browser.pause(1000);
await add4Adults.click(); //4
await browser.pause(2000);

//3. Click Add another room

    const addAnotherRoom = await $('//button[text()="Add another room"]');
    addAnotherRoom.click();
    await browser.pause(2000);


//4. Make Adults=3 in Room-2
const add3Adults = await $('(//input[contains(@aria-label, "Adu")]/following-sibling::button)[2]');
add3Adults.click(); //2
add3Adults.click(); //3
await browser.pause(2000);


//5. Click on Done button

const doneBttn = await $('//button[text()="Done"]');
doneBttn.click();
await browser.pause(3000);

//6. Verify total-travalers is equals to the number of adults mentioned in rooms
        //Need to use isDisplayed to verify
const totalAdults = await $('//button[text()="7 travelers, 2 rooms"]');
const istotalAdultsDisplayed = await totalAdults.isDisplayed();

expect(istotalAdultsDisplayed, 'Total-travalers DOES NOT equal to the number of adults mentioned in rooms').to.be.true;

})



