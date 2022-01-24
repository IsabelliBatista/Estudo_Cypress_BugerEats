// ESSE É O PAGE OBJECTS
// AQUI COLOCAMOS TODA PARTE DE NEGOCIOS

class SignupPage {
  go() {
    // FAZ A PROCURA DA PAGINA E O CLIQUE NO BOTÃO
    cy.visit("/");

    cy.get('a[href="/deliver"]').click();
    cy.get("#page-deliver form h1").should(
      "have.text",
      "Cadastre-se para  fazer entregas"
    );
  }

  fillForm(deliver) {
    // FAZ A BUSCA DOS CAMPOS E PREENCHE ELES
    cy.get('input[name="fullName"]').type(deliver.name);
    cy.get('input[name="cpf"]').type(deliver.cpf);
    cy.get('input[name="email"]').type(deliver.email);
    cy.get('input[name="whatsapp"]').type(deliver.whatsapp);

    cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
    cy.get('input[type="button"][value="Buscar CEP"]').click();

    cy.get('input[name="address-number"]').type(deliver.address.number);
    cy.get('input[name="address-details"]').type(deliver.address.details);

    cy.get('input[name="address"]').should(
      "have.value",
      deliver.address.street
    );
    cy.get('input[name="district"]').should(
      "have.value",
      deliver.address.district
    );
    cy.get('input[name="city-uf"]').should("have.value", deliver.address.city);

    cy.contains(".delivery-method li", deliver.deliver_method).click();
    cy.get('input[accept^="image"] ').attachFile("/images/" + deliver.cnh);
  }

  submit() {
    // VALIDA O CLIQUE NO FORMULARIO
    cy.get('form button[type="submit"]').click();
  }

  modalContentShouldBe(expectedMessage) {
    // VALIDA O MODAL E ESPERA ENCONTRAR UM TEXTO
    cy.get(".swal2-popup .swal2-html-container").should(
      "have.text",
      expectedMessage
    );
  }

  alertMesssageShouldBe(expectedMessage) {
    //PROCURA O ELEMENTO
    // cy.get(".alert-error").should("have.text", expectedMessage);

    // FAZ A COMBINAÇÃO DE ALERTS
    cy.contains(".alert-error", expectedMessage).should("be.visible");
  }
}

export default new SignupPage();
