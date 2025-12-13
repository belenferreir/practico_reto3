Feature: Search for classic Christmas movies

    Scenario: Search for the movie "Home Alone"
        Given I access the movie website
        When I search for "Home Alone" in the search engine
        And I click the search button
        And I select the movie "Solo en casa" from results
        Then I see the title "Solo en casa"
        And the director "Chris Columbus" appears
        And the film has a rating higher than 7.0
