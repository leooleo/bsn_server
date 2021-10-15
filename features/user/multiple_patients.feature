Feature: Receive data from multiple patients and show their data on screen
    As a user i want to
    receive data from more than one patient
    and show them at same screen
    
    Context:
        Given that BSN is connected
        And I am on the Vital Signs Monitor page
        Than I should see all patient that BSN is currently monitoring
        
    #Sad path
    Scenario: The BSN is running but not showing all the patients
        Given I am on the home page
        And there is more than one patient being monitored
        When I follow "Vital Signs Monitor"
        And there is only one or any patient
        Then it must show an query error message
        
    #Happy path
    Scenario: The BSN is running and showing all the patients
        Given I am on the home page
        And there is more than one patient being monitored
        When I follow "Vital Signs Monitor"
        Then it must show all the patients vital signs on the monitor screen
	
