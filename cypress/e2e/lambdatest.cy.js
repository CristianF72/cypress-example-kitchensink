import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown() // slows down each command by 500ms

describe('lambdatest', () => {
  beforeEach(() => {
    cy.visit('https://www.lambdatest.com/selenium-playground/simple-form-demo');
    cy.viewport(1500,1000);
  })
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  })

  it('Single Input Field test', () => {
    const message = 'Wassup';

    cy.get('input#user-message').should('have.attr', 'placeholder', 'Please enter your Message')
      .click({force: true}, {scrollBehavior:'nearest'}).type(`${message}{enter}`);

    cy.get('button#showInput')
      .contains('Get Checked value').click({scrollBehavior:'nearest'});

    cy.get('p#message')
      .contains(`${message}`);
  })

  it('Two Input Fields test', () => {
    const sum1 = '3';
    const sum2 = '4';
    const sum = parseInt(sum1) + parseInt(sum2);

    cy.get('input#sum1', { timeout: 10000 })
      .click({scrollBehavior:'nearest'}).type(`${sum1}{enter}`);

      cy.get('input#sum2')
      .click({scrollBehavior:'nearest'}).type(`${sum2}{enter}`);

    cy.get('button')
      .contains('Get values').click({scrollBehavior:'nearest'});

    cy.get('p#addmessage')
      .contains(`${sum}`);
  })
})