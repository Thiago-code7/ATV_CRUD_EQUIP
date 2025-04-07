const Equipamento = require("../models/Equipamento");

// Criar novo equipamento
exports.criar = async (req, res) => {
  try {
    const { nome, descricao, numero_patrimonio } = req.body;
    const equipamento = await Equipamento.create({ nome, descricao, numero_patrimonio });
    res.status(201).json(equipamento);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao cadastrar equipamento", detalhes: err.message });
  }
};

// Listar todos os equipamentos
exports.listar = async (req, res) => {
  try {
    const equipamentos = await Equipamento.findAll();
    res.json(equipamentos);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar equipamentos", detalhes: err.message });
  }
};

// Atualizar um equipamento pelo ID
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const equipamentoExistente = await Equipamento.findById(id);

    if (!equipamentoExistente) {
      return res.status(404).json({ erro: "Equipamento não encontrado" });
    }

    const { nome, descricao, numero_patrimonio } = req.body;
    const equipamentoAtualizado = await Equipamento.update(id, { nome, descricao, numero_patrimonio });
    res.json(equipamentoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar equipamento", detalhes: err.message });
  }
};

// Deletar um equipamento pelo ID
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const equipamento = await Equipamento.delete(id);

    if (!equipamento) {
      return res.status(404).json({ erro: "Equipamento não encontrado para exclusão" });
    }

    res.json({ mensagem: "Equipamento deletado com sucesso", equipamento });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao deletar equipamento", detalhes: err.message });
  }
};

// Deletar todos os equipamentos
exports.deletarTodos = async (req, res) => {
  try {
    const equipamentosRemovidos = await Equipamento.deleteAll();

    if (equipamentosRemovidos.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum equipamento encontrado para deletar." });
    }

    res.json({ mensagem: "Equipamentos deletados com sucesso", equipamentos: equipamentosRemovidos });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao deletar todos os equipamentos", detalhes: err.message });
  }
};
