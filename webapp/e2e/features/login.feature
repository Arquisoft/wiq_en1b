Feature: Login page functionality

  Scenario: Login
    Given I login a user
    Then I am in /menu
  Scenario: Failed login
    Given I am on the login page
    When I try to login
    Then I am in /login

