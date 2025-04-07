const Emprestimo = require("../models/Emprestimo");

exports.criar = async (req, res) => {
  try {
    const { funcionario_id, equipamento_id, data_retirada } = req.body;
    const emprestimo = await Emprestimo.create({
      funcionario_id,
      equipamento_id,
      data_retirada,
      status: "Em andamento"
    });

    res.status(201).json(emprestimo);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao registrar empréstimo", detalhes: err.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const emprestimos = await Emprestimo.findAll();
    res.json(emprestimos);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar empréstimos" });
  }
};

exports.devolver = async (req, res) => {
  try {
    const { id } = req.params;
    const { data_devolucao } = req.body;
    const devolvido = await Emprestimo.marcarDevolucao(id, data_devolucao);
    res.json(devolvido);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao devolver equipamento", detalhes: err.message });
  }
};
