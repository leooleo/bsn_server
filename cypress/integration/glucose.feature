Feature: Displays a glucose meter on the vital Signs interface.

# happy Path:
    
Scenario: The glucose meter chart is properly shown
Given that I am on the Vital Signs Page
Then I should be able to see the glucose chart variations of the monitored patient
