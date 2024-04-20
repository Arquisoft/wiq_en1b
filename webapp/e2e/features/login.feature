Feature: Login page functionality

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should be redirected to the menu

  Scenario: Failed login
    Given I am on the login page
    When I enter invalid credentials
    Then I should NOT be redirected to the menu

