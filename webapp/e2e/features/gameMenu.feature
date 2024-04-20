Feature: Game Menu page functionality
 Scenario: There should be visible three links
    Given I am on the game menu
    Then three buttons should be visible
 Scenario: New Game should go to game configurator
   Given I am on the game menu
   When I click on New Game
   Then I should be in the game configurator
