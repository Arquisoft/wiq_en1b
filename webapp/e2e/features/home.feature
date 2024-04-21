Feature: Home page functionality

  Scenario: Opening the text container
    Given I am on the home page
    When I click on the toggle button to open 
    Then The text container should be hidden

  Scenario: Closing the text container
    Given I am on the home page
    When I click on the toggle button to open and then I click it to close 
    Then The text container should be visible

