
describe('Glucose', () => {

    it('Visits the monitor page', () => {
        cy.visit('/')
        
        cy.contains('Vital Signs Monitor').click()
        cy.url().should('include', '/monitor')
        
        cy.contains('Glucose').should('exist')
    })
})