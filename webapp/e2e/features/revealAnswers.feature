Feature: Question View answers
 Scenario: Create Competitive Game and reveal correct answer color
    Given I am on the game configurator and create a competitive game
    When I let the counter end
    Then Correct Color appears
 Scenario: Create Competitive Game and reveal wrong answer colors
    Given I am on the game configurator and create a competitive game
    When I let the counter end
    Then Incorrect Color appears