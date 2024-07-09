/* eslint-disable no-undef */
describe('Teste de página inicial', () => {
  beforeEach(() => {
    cy.visit('https://e-carro-souenergy.vercel.app/')
  });

  it('Verifica se os botões da navbar estão presentes', () => {
    cy.get('button').contains('Ofertas').should('be.visible');
    cy.get('button').contains('Administração').should('be.visible');
  });
  
  it('verifica se é possível abrir um modal e verificar suas informações', () => {
    cy.get(':nth-child(1) > .MuiCardActionArea-root > .MuiCardActions-root > .MuiButtonBase-root').click();
  
    cy.get('.css-1a82xjq').should('be.visible');
  
    cy.get('.css-ohugnc > :nth-child(7)').scrollIntoView();

    cy.contains('Preço:').should('be.visible'); 
    cy.contains('Ano:').should('be.visible'); 
    cy.contains('Cor:').should('be.visible'); 
    cy.contains('Placa:').should('be.visible'); 
    cy.contains('Cidade:').should('be.visible'); 
    cy.contains('Quilometragem').should('be.visible'); 
    cy.contains('Data de Cadastro:').should('be.visible'); 
  });
  
  
  it('Verifica se é possível fechar o modal de anúncio', () => {
    cy.get(':nth-child(1) > .MuiCardActionArea-root > .MuiCardActions-root > .MuiButtonBase-root').click();
    cy.get('.css-1a82xjq > .MuiButton-root').click();
    cy.get(':nth-child(1) > .MuiCardActionArea-root > .MuiCardActions-root > .MuiButtonBase-root').should('be.visible');
  });
});
