Feature: Show alert if the vital signs(Oxigenation, Temperature) may indicate a covid-19 case
As an user
I want the bsn to trigger an alert
if a patient have a covid-19 related vital sign gets worse

Context:
    Given that i am on the Vital Signs Page
    And that is patients being monitored
    Then I should see an alert sign if any of them may have covid-19

# happy path: 
Scenario: An alert is shown when a patient may have covid-19
Given that i am on the Vital Signs Page
And any of the patients show a negative change in any of the covid-19 related vital signs
Then i should see an covid-19 alert triggering in the patient session

# sad path:
Scenario: Any of the patients have a negative change in their covid-19 related vital signs but the alert is not triggering
Given that i am on the Vital Signs Page
And any of the patients show a negative change in any of the covid-19 related vital signs
And their alert is not triggering
...

