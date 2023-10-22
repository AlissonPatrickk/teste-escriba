describe('End-to-End Test Register', () => {
    it('should register, log in, and add items to the cart', () => {
      cy.visit('http://localhost:9000/#/');
      cy.contains('Não possui conta?').click();
      cy.get('input[aria-label="Nome completo"]').should('be.visible').type('Alisson Patrick');
      cy.get('input[aria-label="Documento"]').type('134.114.779-09');
      cy.get('input[aria-label="Senha"]').type('password123');
      cy.get('input[aria-label="Data de nascimento"]').type('1990-01-01');
      cy.get('button.q-btn.bg-primary').should('be.visible').click();
      cy.url().should('include', '/Items');      
      const items = [
        { name: 'produto 1', quantity: "2" },
        { name: 'produto 2', quantity: "10" },
        { name: 'produto 3', quantity: "4" },
      ];
      items.forEach((item, index) => {
        cy.contains(item.name).should('be.visible');
        cy.get('input[aria-label="Quantidade"]').eq(index).type(item.quantity, { force: true });
        cy.contains('Adicionar ao carrinho').click();
        cy.contains('Adicionado').should('be.visible');
        cy.get('button[aria-label="Menu"]').click();
        cy.wait(1000);
        cy.get('aside.q-drawer').should('have.css', 'transform').then((transformValue) => {
          expect(transformValue).to.not.equal('none');
        });
      });
      cy.contains('Seu carrinho').click({ force: true });
      cy.contains('produto 1')
        .parent()
        .find('.q-checkbox__native')
        .check({ force: true });
      cy.contains('produto 2')
        .parent()
        .find('.q-checkbox__native')
        .check({ force: true }); 
      cy.contains('Comprar Itens Selecionados')
        .click();
    });
  });
  