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
		
