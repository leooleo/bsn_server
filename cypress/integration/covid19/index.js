import {Given, And, Then} from "cypress-cucumber-preprocessor/steps"
const { visit, the } = cy;

Given("that I am on the Vital Signs Page", () => {
    visit('/') 
    cy.contains('Vital Signs Monitor').click()
    cy.url().should('include', '/monitor')
});
When("any of the patients show a negative change in any of the covid-19 related vital signs", () => {
    cy.contains(/([0-9]).+%/)
    cy.contains(/([0-9]).+C/)
});
Then("I should see an covid-19 alert triggering in the patient session", () => {
    cy.contains("Covid Risk")
});