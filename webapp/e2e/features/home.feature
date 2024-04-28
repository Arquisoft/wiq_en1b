Feature: Home page functionality

  Scenario: The text container is initially visible
    Given I am on the home page
    Then The text container should be visible

  Scenario: Opening the text container
    Given I am on the home page
    When I click on the toggle button to open 
    Then The text container should be hidden