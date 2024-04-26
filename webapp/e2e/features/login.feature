Feature: Login page functionality

  Scenario: Login
    Given I am on the login page
    When I login as user
    Then I am in /menu

