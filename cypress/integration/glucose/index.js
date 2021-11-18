import {Given, Then} from "cypress-cucumber-preprocessor/steps"

Given("that I am on the Vital Signs Page", () => {
    cy.visit('/') 
    cy.contains('Vital Signs Monitor').click()
    cy.url().should('include', '/monitor')
});

Then("I should be able to see the glucose chart variations of the monitored patient", () => {
    cy.contains("Glucosemeter")
    cy.contains(/([0-9])+.([0-9]).mmol.L/)
})