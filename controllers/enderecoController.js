const Endereco = require("../models/Endereco");

// Criar novo endereço
exports.criar = async (req, res) => {
  try {
    const { cep, logradouro, complemento, bairro, cidade, estado, numero, funcionario_id } = req.body;
    if (!cep || !funcionario_id) {
      return res.status(400).json({ erro: "CEP e funcionário são obrigatórios." });
    }
    const endereco = await Endereco.create({ cep, logradouro, complemento, bairro, cidade, estado, numero, funcionario_id });
    res.status(201).json(endereco);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao cadastrar endereço", detalhes: err.message });
  }
};

// Listar todos os endereços
exports.listar = async (req, res) => {
  try {
    const enderecos = await Endereco.findAll();
    res.json(enderecos);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar endereços", detalhes: err.message });
  }
};

// Atualizar um endereço pelo ID
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const enderecoExistente = await Endereco.findById(id);

    if (!enderecoExistente) {
      return res.status(404).json({ erro: "Endereço não encontrado" });
    }

    const { cep, logradouro, complemento, bairro, cidade, estado, numero, funcionario_id } = req.body;
    const enderecoAtualizado = await Endereco.update(id, { cep, logradouro, complemento, bairro, cidade, estado, numero, funcionario_id });
    res.json(enderecoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar endereço", detalhes: err.message });
  }
};

// Deletar um endereço pelo ID
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const endereco = await Endereco.delete(id);

    if (!endereco) {
      return res.status(404).json({ erro: "Endereço não encontrado para exclusão" });
    }

    res.json({ mensagem: "Endereço deletado com sucesso", endereco });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao deletar endereço", detalhes: err.message });
  }
};

// Deletar todos os endereços
exports.deletarTodos = async (req, res) => {
  try {
    const enderecosRemovidos = await Endereco.deleteAll();

    if (enderecosRemovidos.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum endereço encontrado para deletar." });
    }

    res.json({ mensagem: "Endereços deletados com sucesso", enderecos: enderecosRemovidos });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao deletar todos os endereços", detalhes: err.message });
  }
};
