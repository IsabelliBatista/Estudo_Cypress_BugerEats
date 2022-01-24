// ESSA PAGINA CONTEM AS INFORMAÇÕES PARA PREENCHER O FORM
// ADICIONAMOS UMA MASSSA DE DADOS FAKE
// ADICIONAMOS UMA VALIDAÇÃO DE DADOS FAKE DE CPF

var faker = require("faker");
var cpf = require("gerador-validador-cpf");

export default {
  deliver: function () {
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();

    var data = {
      name: `${firstName} ${lastName}`,
      cpf: cpf.generate(),
      email: faker.internet.email(firstName),
      whatsapp: "11999999999",
      address: {
        postalcode: "04939120",
        street: "Rua Bento Rodrigues",
        number: "177",
        details: "ao lado da pizzaria",
        district: "Jardim Tupi",
        city: "São Paulo/SP",
      },
      deliver_method: "Moto",
      cnh: "cnh-digital.jpg",
    };
    return data;
  },
};
