describe('The Home Page', function() {
    it('successfully loads', function() {
    
    cy.visit('/'); 
  
    cy.get('input#valueUR').type('1.25');

    cy.get('input#spendTravel').type('2500');

    cy.get('input#spendDining').type('2500');

    cy.get('#useCFU').check();

    cy.get('input#spendEE').type('5000');

    cy.get('input#valueCredit').type('300');

    cy.get('input#valuePP').type('0');

    cy.get('input#valueInsurance').type('0');

    cy.get('#submitbutton').click();

    cy.server()

    cy.route('GET', '/get-results').as('get-resulsts')
    
});
});