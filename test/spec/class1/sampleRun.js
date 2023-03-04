describe('Test Facebook Login Page', () =>{
    it("Test Facebook URL", async () =>{
        await browser.url('https://www.facebook.com/');
        await browser.pause(2000);
    })
})