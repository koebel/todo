Feature: todo
	As a user
	I want to add items to the todo list
	So that I can organize tasks

	Scenario: add an item to the todo list
		Given a user has navigated to the homepage
		When the user adds "new task" to the todo list using the webUI
		Then card "new task" should be displayed on the webUI

	Scenario: mark todo list item as completed
		Given a user has navigated to the homepage 
		And a card "new task" has been added to the todo list
		When the user marks the card "new task" as completed using the webUI
		Then the card "new task" should be labeled as completed on the webUI

	Scenario: delete todo list item
		Given a user has navigated to the homepage 
		And a card "new task" has been added to the todo list
		When the user deletes the card "new task" using the webUI
		Then card "new task" should not be displayed on the webUI

	Scenario: filter for completed todo list items
		Given a user has navigated to the homepage 
		And a card "task1" has been added to the todo list
		And a card "task2" has been added to the todo list
		And a card "task3" has been added to the todo list
		And the card "task1" has been marked as completed
		When the user sets the filter to "uncomplete" using the webUI
		Then card "task2" should be displayed on the webUI
		But card "task1" should not be displayed on the webUI
		
