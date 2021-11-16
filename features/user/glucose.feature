Feature: Glucose

    Displays a glucose meter on the vital Signs interface.
Context:

    Given that i am on the Vital Signs Page
    And that the patient is being monitored
    Then i should see the glucose meter chart together with the other vital signs

Happy Path:
    
    Scenario: The glucose meter chart is properly shown

    Given that i am on the Vital Signs Page
    Then i should be able to see the glucose chart variations of the monitored patient
