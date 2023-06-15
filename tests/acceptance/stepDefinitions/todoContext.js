const {Given, When, Then} = require('@cucumber/cucumber')

// import expect for assertion
const { expect } = require("@playwright/test");

//launch url
const url = 'http://localhost:3000'

//define selectors
const homepageElement = '.borderTodo' 
/* 
is it better to use class or id as selector? 
according to doc, both of them should be avoided... 
see https://playwright.dev/docs/locators
CSS and XPath are not recommended as the DOM can often change leading to non resilient tests. 
Instead, try to come up with a locator that is close to how the user perceives the page 
such as role locators or define an explicit testing contract using test ids. 
*/
const todoInput = '.todo-input';
const todoButton = '.todo-button';
const todoItem = '.todo .todo-item';
const todoItemCompleted = '.todo .completed';
const todoCompleteButton = '.complete-btn';
const todoFilter = '.filter-todo';
const todoList = '.todo-list';

// scenario1
Given('a user has navigated to the homepage', async function() {
	// navigate to the app
	await page.goto(url)
	// locate the element in the webUI
	const locator = await page.locator(homepageElement)
	// assert that it's visible
	await expect(locator).toBeVisible()

    //return 'pending'; // what should be returned?
    }); // is semicolon required? --> seems to be optional in JS
       
When('the user adds {string} to the todo list using the webUI', async function(item) {
	// fill the item that was input from the feature file , to the inputText field in the UI
	await page.fill(todoInput, item)
	// click the button
	await page.click(todoButton)

    //return 'pending';
    });
       
Then('card {string} should be displayed on the webUI', async function(item) {
    // get text of the item that is visible in the UI
	const text = await page.innerText(todoItem)
	// assert that its name is similar to what we provided
	await expect(text).toBe(item)

    //return 'pending';
    });

// scenario2
Given('a card {string} has been added to the todo list', async function(item)  {
	// fill the item that was input from the feature file , to the inputText field in the UI
	await page.fill(todoInput, item)
	// click the button
	await page.click(todoButton)    
	});
       
When('the user marks the card {string} as completed using the webUI', async function(item) {
	await page.click(todoCompleteButton)
	});
       
Then('the card {string} should be labeled as completed on the webUI', async function(item) {
	// Write code here that turns the phrase above into concrete actions
	// get text of the item that has been marked as completed
	const text = await page.innerText(todoItemCompleted)
	// assert that its name is similar to what we provided
	await expect(text).toBe(item)
	//return 'pending';
	});

/*    
Then('the card {string} shouldn\'t be displayed if filter uncomplete is applied', async function(item) {
	// select filter uncomplete
	//await page.selectOption(todoFilter, {value: "uncomplete"})
	await page.selectOption(todoFilter, {value: "all"})
	
	const i = page.locator(todoItem).count();
	await expect(i).toBe(0);
	// check if card is still visible (iterate through all cards)
	/*
	for i in itemRoots
		text = await page.innerText(todoItemCompleted)
		await expect(text).not.toBe(item);
		*/

    //return 'pending';
	//});

