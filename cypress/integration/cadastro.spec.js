import signup from "../pages/SignupPage";
import signupFactory from "../factories/SignupFactory";

describe("Cadastro", () => {
  // AQUI TEMOS UM EXEMPLO DE COMO RODAR TESTES EM TODOS OS CENÁRIOS

  // before(function(){
  //   cy.log('tudo é executado 1 vez antes de todo casos de testes')
  // })
  // beforeEach(function(){
  //   cy.log('tudo é executado antes de todo casos de teste')
  // })
  // after(function(){
  //   cy.log('tudo é executado 1 vez depois de todo casos de testes')
  // })
  // afterEach(function(){
  //   cy.log('tudo é executado depois de todo casos de testes')
  // })

  // -------------------------------------------------------------------------

  // AQUI USAMOS A MASSA DE DADOS EM JSON MAS PREFERIMOS USAR AS FACTORIES

  // beforeEach(function () {
  //   cy.fixture("deliver").then((d) => {
  //     this.deliver = d;
  //   });
  // });

  // signup.fillForm(this.deliver.signup);

  // -------------------------------------------------------------------------

  it("Usuário deve se tornar um deliver", function () {
    var deliver = signupFactory.deliver();

    signup.go();
    signup.fillForm(deliver);
    signup.submit();

    const expectedMessage =
      "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.";
    signup.modalContentShouldBe(expectedMessage);
  });
  it("CPF Inválido", function () {
    var deliver = signupFactory.deliver();
    deliver.cpf = "000000asd12";

    signup.go();
    signup.fillForm(deliver);
    signup.submit();
    signup.alertMesssageShouldBe("Oops! CPF inválido");
  });
  it("Email incorreto", function () {
    var deliver = signupFactory.deliver();
    deliver.email = "isa.com.br";

    signup.go();
    signup.fillForm(deliver);
    signup.submit();
    signup.alertMesssageShouldBe("Oops! Email com formato inválido.");
  });

  // -------------------------------------------------------------------------

  // JEITO MAIS COMPLEXO DE VALIDAR CAMPOS IGUAIS
  // AQUI SE ALGUM CAMPO ESTIVER ERRADO ELE NÃO PARA A VALIDAÇÃO, MOSTRA O ERRO MAS VALIDA OS CAMPOS CERTOS
  context("Campos obrigatorios", function () {
    const messages = [
      { field: "name", output: "É necessário informar o nome" },
      { field: "cpf", output: "É necessário informar o CPF" },
      { field: "email", output: "É necessário informar o email" },
      { field: "postalcode", output: "É necessário informar o CEP" },
      { field: "number", output: "É necessário informar o número do endereço" },
      { field: "deliver_method", output: "Selecione o método de entrega" },
      { field: "cnh", output: "Adicione uma foto da sua CNH" },
    ];

    before(function () {
      signup.go();
      signup.submit();
    });

    messages.forEach(function (msg) {
      it(`${msg.field} é obrigatório`, function () {
        signup.alertMesssageShouldBe(msg.output);
      });
    });
  });

  // JEITO MAIS SIMPLES DE VALIDAR OS CAMPOS

  //   it("Campos obrigatorios", function () {
  //     signup.go();
  //     signup.submit();
  //     signup.alertMesssageShouldBe("É necessário informar o nome");
  //     signup.alertMesssageShouldBe("É necessário informar o CPF");
  //     signup.alertMesssageShouldBe("É necessário informar o email");
  //     signup.alertMesssageShouldBe("É necessário informar o CEP");
  //     signup.alertMesssageShouldBe("É necessário informar o número do endereço");
  //     signup.alertMesssageShouldBe("Selecione o método de entrega");
  //     signup.alertMesssageShouldBe("Adicione uma foto da sua CNH");
  //   });

  // -------------------------------------------------------------------------
});
