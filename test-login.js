const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

        console.log("Navigating...");
        await page.goto('http://localhost:3000/dashboard.html');

        await page.waitForSelector('#login-code', { timeout: 5000 });
        console.log("Typing credentials...");
        await page.type('#login-code', 'AJWA');
        await page.type('#login-pass', 'Dutch@26');

        console.log("Clicking login...");
        const buttons = await page.$$('.modal-body .btn-primary');
        await buttons[buttons.length - 1].click(); // click the log in button

        await new Promise(r => setTimeout(r, 2000));

        const style = await page.evaluate(() => document.getElementById('login-err').style.display);
        console.log('Login Error Message Style:', style);

        const modalStyle = await page.evaluate(() => document.getElementById('modal-login').classList.contains('open'));
        console.log('Is Modal Open?:', modalStyle);

        await browser.close();
    } catch (e) {
        console.error("Test failed:", e);
    }
})();
