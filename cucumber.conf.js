const { Before, BeforeAll, AfterAll, After, setDefaultTimeout } = require("@cucumber/cucumber");

// you can choose other browsers like webkit or firefox according to your requirement
const { chromium } = require("playwright");

// in milliseconds
setDefaultTimeout(60000)

// launch the browser
BeforeAll(async function() {
   global.browser = await chromium.launch({
       headless: false, // show the test in the browser while running
       slowMo: 1000,
   });
});

// create a new browser context and page per scenario
Before(async function() {
   global.context = await global.browser.newContext();
   // using the browser.newContext([options]) method playwright also allows creating incognito browser contexts
   global.page = await global.context.newPage();
});

// cleanup after each scenario
After(async function() {
   await global.page.close();
   await global.context.close();
});

// close the browser
AfterAll(async function() {
   await global.browser.close();
});



