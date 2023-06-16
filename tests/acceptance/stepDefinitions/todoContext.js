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
const todoDeleteButton = '.trash-btn';
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
    }); // is semicolon required? --> seems to be optional in JS
       
When('the user adds {string} to the todo list using the webUI', async function(item) {
	// fill the item that was input from the feature file , to the inputText field in the UI
	await page.fill(todoInput, item)
	// click the button
	await page.click(todoButton)
    });
       
Then('card {string} should be displayed on the webUI', async function(item) {
    // get text of the item that is visible in the UI
	const text = await page.innerText(todoItem)
	// assert that its name is similar to what we provided
	await expect(text).toBe(item)
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
	});

//scenario3
When('the user deletes the card {string} using the webUI', async function(item) {
	await page.click(todoDeleteButton)
    });

Then('card {string} should not be displayed on the webUI', async function(item) {
	// TODO!!!

	//const count = await page.locator('.todo-list:has(li.todo-item)').count();
	//await expect('.todo-item:text("' + item + '")').not.toBeVisible()

	const locator = await page.locator('.todo-item:text("' + item + '")')
	await expect(locator).not.toBeVisible()
	//const text1 = await page.textContent('.todo-item:text("' + item + '")') 
	//const text2 = await page.textContent('.todo-list:has(li.todo-item)') + count.toString()
	//await page.fill(todoInput, text1)

	//return 'pending';
	});
	
	/*


	const text = await page.textContent('.todo-list:has(li.todo-item)')
	const locator = page.locator(todoItem);
	await expect(locator).not.toBeVisible({timeout=2000});
	
	//return 'pending';
    });
	/*
	const text = i.innerText(todoItem)
	not.toContainText(item);


	const count = await page.locator(todoItem).isVisible().count

	if (count > 0){
		for (let i = 0; i < count; i++)
		{
			const temp = page.locator('.todo .todo-item':nth-child(i)).getbytext()
			await page.fill(todoInput, temp)
			await expect(temp.not.toBe(item))
		}
	}
		
/*

	}
	else
	{
		expect(true); // no items selected, thus always true
	}

		await page.fill(todoInput, await page.locator(todoItem).isVisible().count.toString())

	for (const i of await page.locator(todoItem).isVisible()){
		const text = i.innerText(todoItem)
		await page.fill(todoInput, text.toString())
		await expect(i.innerText(todoItem)).not.toBe(item)
		}
	}
	

	/*
	// assert that its name is similar to what we provided
	await expect(text).toBe(item)

	for (const i of await page.locator(todoItem).all()){
		const text = i.innerText(todoItem)
		await page.fill(todoInput, text.toString())
		await expect(i.innerText(todoItem)).not.toBe(item)
		}

/*
	//await page.textContent('article:has(div.promo)');
	const text = await page.textContent('.todo-list:has(li.todo-item)')
	await expect(text).not.toBe(item)



	const locator = await page.locator(todoItem)
	// assert that it's visible
	await expect(locator).toHaveCount(0)
	//await expect(todoItem).toHaveCount(0);

	const text = await page.innerText(todoItem)
	// assert that its name is similar to what we provided
	await expect(text).toBe(item)
	
		const count = await page.locator(todoItem).count();
	if (count > 0) {
		const text = await page.innerText(todoItem)
		await expect(text).not.toBe(item)
		}
	else {
		await expect(count.toEqual(0));
	}


	

	/*
	//const count = items.count();
	const count = len(items);
	const text = ""
	// iterate over all items and check if there is any card with that label
	for i in items:
    //get the element/tag
    	element = items.nth(i)
    	text = element.inner_text()
    	await expect(text).not.toBe(item)

	// check if there are no cards? --> would not really check this requirement
	//const text = await page.innerText(todoItem)
	// assert that its name is similar to what we provided
	//await expect(text).not.toBe(item)
	*/

//scenario4
Given('the card {string} has been marked as completed', async function(item) {
	await page.click(todoCompleteButton)
    });
       
When('the user sets the filter to {string} using the webUI', async function(item) {
    await page.selectOption(todoFilter, {value: item})
    });

