const Funcionario = require("../models/Funcionario");

// Criar novo funcionário
exports.criar = async (req, res) => {
  try {
    const { nome, cpf, telefone, email } = req.body;
    const funcionario = await Funcionario.create({ nome, cpf, telefone, email });
    res.status(201).json(funcionario);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao cadastrar funcionário", detalhes: err.message });
  }
};

// Listar todos os funcionários
exports.listar = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.json(funcionarios);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar funcionários", detalhes: err.message });
  }
};

// Atualizar um funcionário pelo ID
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const funcionarioExistente = await Funcionario.findById(id);

    if (!funcionarioExistente) {
      return res.status(404).json({ erro: "Funcionário não encontrado" });
    }

    const { nome, cpf, telefone, email } = req.body;
    const funcionarioAtualizado = await Funcionario.update(id, { nome, cpf, telefone, email });
    res.json(funcionarioAtualizado);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar funcionário", detalhes: err.message });
  }
};

// Deletar um funcionário pelo ID
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const funcionario = await Funcionario.delete(id);

    if (!funcionario) {
      return res.status(404).json({ erro: "Funcionário não encontrado para exclusão" });
    }

    res.json({ mensagem: "Funcionário deletado com sucesso", funcionario });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao deletar funcionário", detalhes: err.message });
  }
};

exports.deletarTodos = async (req, res) => {
  try {
    const funcionariosRemovidos = await Funcionario.deleteAll();

    if (funcionariosRemovidos.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum funcionário encontrado para deletar." });
    }

    res.json({ mensagem: "Funcionários deletados com sucesso", funcionarios: funcionariosRemovidos });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao deletar todos os funcionários", detalhes: err.message });
  }
};