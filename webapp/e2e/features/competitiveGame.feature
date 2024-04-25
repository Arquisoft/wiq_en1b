Feature: Game Configurator and Competitive Game functionality
 Scenario: Create Competitive Game should go to /questions
    Given I am on the game configurator
    When I click on new competitive game
    Then I am in /questions