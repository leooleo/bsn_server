Feature: Show alert if the vital signs(Oxigenation, Temperature) may indicate a covid-19 case

# happy path: 
Scenario: An alert is shown when a patient may have covid-19
Given that I am on the Vital Signs Page
When any of the patients show a negative change in any of the covid-19 related vital signs
Then I should see an covid-19 alert triggering in the patient session



