const axios = require("axios");

async function buscarEnderecoPorCep(cep) {
  const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

  if (data.erro) {
    throw new Error("CEP inválido");
  }

  return {
    rua: data.logradouro,
    bairro: data.bairro,
    cidade: data.localidade,
    estado: data.uf
  };
}

module.exports = buscarEnderecoPorCep;
