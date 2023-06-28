// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('test_alert_or_confirm_box', function(alert_type_text, alert_window_text) {
    cy.get('div[class="row"]', { timeout: 10000 }).find('span').contains(alert_type_text).as('alert');
    cy.get('@alert').parent().next().find('button').click();

    cy.on('window:alert', (str) => {
        expect(str).to.equal(alert_window_text);
    });

    cy.on('window:confirm', (str) => {
        expect(str).to.equal(alert_window_text);
        cy.get('#confirmResult').should('contain','You selected Ok');
    });
});

Cypress.Commands.add('test_prompt_box', function(alert_type_text, alert_window_text) {
    let my_stub;
    cy.window().then(win => {
        my_stub = cy.stub(win, 'prompt').returns('Io is baaaaa!');
        cy.get('div[class="row"]', { timeout: 10000 }).find('span').contains(alert_type_text).as('alert');
        cy.get('@alert').parent().next().find('button').click();
        cy.wrap(my_stub).should(() => {expect(my_stub).to.have.been.calledWith(alert_window_text)});
        cy.get('#promptResult').should('have.text', 'You entered Io is baaaaa!');
    })
});

// Cypress.Commands.add('test_alerts', function(alerts) {
//     alerts.forEach(alert => {
//         cy.get('div[class="row"]', { timeout: 10000 }).find('span').contains(alert[0]).as('alert');
//         cy.get('@alert').parent().next().find('button').click();
//         cy.on('window:alert', (str) => {
//             expect(str).to.equal(alert[1]);
//         });
//     });
// });
