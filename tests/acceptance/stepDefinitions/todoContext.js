const {Given, When, Then} = require('@cucumber/cucumber')

// import expect for assertion
const { expect } = require("@playwright/test")

//launch url
const url = 'http://localhost:3000'

//define selectors
const homepageElement = '.App' // '.borderTodo' 
/* 
is it better to use class or id as selector? according to doc, both of them should be avoided... 
see https://playwright.dev/docs/locators
CSS and XPath are not recommended as the DOM can often change leading to non resilient tests. 
Instead, try to come up with a locator that is close to how the user perceives the page 
such as role locators or define an explicit testing contract using test ids. 
*/
const todoInput = '.todo-input'
const todoButton = '.todo-button'
const todoItem = '.todo .todo-item'
const todoItemCompleted = '.todo .completed'
const todoCompleteButton = '.complete-btn'
const todoDeleteButton = '.trash-btn'
const todoFilter = '.filter-todo'

// initial methods for scenario1
Given('a user has navigated to the homepage', async function() {
	// navigate to the app
	await page.goto(url)
	// locate the element in the webUI
	const locator = await page.locator(homepageElement)
	// assert that element is visible
	await expect(locator).toBeVisible()
    })
       
When('the user adds {string} to the todo list using the webUI', async function(item) {
	// fill the item specified in the feature file into the inputText field in the UI
	await page.fill(todoInput, item)
	// click the add todo button
	await page.click(todoButton)
    })
       
Then('card {string} should be displayed on the webUI', async function(item) {
    /*
    // get text of the item that is visible in the UI
	const text = await page.innerText(todoItem)
	// assert that its name is equal to what we provided
	await expect(text).toBe(item)
	*/

	// alternative implementation
	// search card with the label specified in the feature file
	const locator = await page.locator(todoItem + ':text("' + item + '")')
	// assert that this item is visible
	await expect(locator).toBeVisible()
    })

// additional methods for scenario2
Given('a card {string} has been added to the todo list', async function(item)  {
	// fill the item specified in the feature file into the inputText field in the UI
	await page.fill(todoInput, item)
	// click the add todo button
	await page.click(todoButton)    
	})
       
When('the user marks the card {string} as completed using the webUI', async function(item) {
	// click the complete button
	await page.click(todoCompleteButton)
	})
       
Then('card {string} should be labeled as completed on the webUI', async function(item) {
	// search card with the label specified in the feature file (card that has been marked as completed)
	const locator = await page.locator(todoItemCompleted + ':text("' + item + '")')
	// assert that this item is visible
	await expect(locator).toBeVisible()
	})

//additional methods for scenario3
When('the user deletes the card {string} using the webUI', async function(item) {
	// click the delete button
	await page.click(todoDeleteButton)
    })

Then('card {string} should not be displayed on the webUI', async function(item) {
	/*
	just check if there are no cards? 
	--> this would not really check this requirement, since it's possible that there are several cards
	ensure that there is no card with the given label
	this test fails if there are two cards with the same label... it seems like label names don't need to be unique in this todo app...
	*/

	// search card with the label specified in the feature file	
	const locator = await page.locator(todoItem + ':text("' + item + '")')
	// assert that this item is not visible
	await expect(locator).not.toBeVisible()
	})

//additional methods for scenario4
Given('card {string} has been marked as completed', async function(item) {
	// click the complete button
	await page.click(todoCompleteButton)
    })
       
When('the user sets the filter to {string} using the webUI', async function(item) {
	// select filter speicified in the feature file
    await page.selectOption(todoFilter, {value: item})
    })

