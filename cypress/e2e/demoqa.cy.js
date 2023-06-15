import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown(500) // slows down each command by 500ms

describe('demoqa', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
    cy.viewport(1500,1000);
  })
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  })

  it('Test instant alert box', () => {
    cy.test_alert_or_confirm_box('Click Button to see alert', 'You clicked a button');
  })

  it('Test 5 seconds alert box', () => {
    cy.test_alert_or_confirm_box('On button click, alert will appear after 5 seconds', 'This alert appeared after 5 seconds');
  })
  
  it('Test confirm box', () => {
    cy.test_alert_or_confirm_box('On button click, confirm box will appear', 'Do you confirm action?');
  })

  it('Test prompt box', () => {
    cy.test_prompt_box('On button click, prompt box will appear', 'Please enter your name');
  })

  it.skip('Two Input Fields test', () => {
    const sum1 = '3';
    const sum2 = '4';
    const sum = parseInt(sum1) + parseInt(sum2);

    cy.get('input#sum1', { timeout: 10000 })
      .click({scrollBehavior:'nearest'}).type(`${sum1}{enter}`);

    cy.get('input#sum2')
      .click({scrollBehavior:'nearest'}).type(`${sum2}{enter}`);

    // cy.get('button')
    //   .contains('Get values').click({scrollBehavior:'nearest'});

    cy.get('#gettotal').find('button').click();

    cy.get('p#addmessage')
      .contains(`${sum}`);
  })
})