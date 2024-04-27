Feature: NavBar functionality

  Scenario: Displaying navbar elements correctly
    Given I am on the home page
    Then The navbar elements are visible

  Scenario: Changing language
    Given I am on the home page
    When I click on the language button
    Then The language options menu should be visible
    Then I choose Spanish
    Then The navbar should be in Spanish

