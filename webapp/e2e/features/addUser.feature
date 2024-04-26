Feature: Login page functionality

  Scenario: Register
    Given I am on the add user page
    When I register a user
    Then I am in /menu

