describe('Covid-19 alert test', () => {

    it('Visits the home page', () => {
        cy.visit('/')
        
        cy.contains('Vital Signs Monitor').click()
        cy.url().should('include', '/monitor')
        
        cy.contains('Covid Risk').should('exist')
    })
})