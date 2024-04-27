Feature: Game Configurator and Competitive Game functionality
 Scenario: Create Competitive Game should go to /questions
    Given I am on the game configurator
    When I click on new competitive game
    Then I am in /questions
 Scenario: Create Customized Game should go to /questions
    Given I am on the game configurator
    When I click on new customized game
    Then I am in /questions
 Scenario: Create Customized Game of Capital questions
    Given I am on the game configurator
    When I click select Capital and I create a new customized game
    Then I get Capital questions
 Scenario: Create Customized Game of Language questions
    Given I am on the game configurator
    When I click select Language and I create a new customized game
    Then I get Language questions
 Scenario: Create Customized Game of Population questions
    Given I am on the game configurator
    When I click select Population and I create a new customized game
    Then I get Population questions
 Scenario: Create Customized Game of Size questions
    Given I am on the game configurator
    When I click select Size and I create a new customized game
    Then I get Size questions
 Scenario: Create Customized Game of Head of Goverment questions
    Given I am on the game configurator
    When I click select Head of Goverment and I create a new customized game
    Then I get Head of Goverment questions