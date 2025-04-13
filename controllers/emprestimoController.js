const Emprestimo = require("../models/Emprestimo");

const emprestimoController = {
  // Criar um novo empréstimo
  async criar(req, res) {
    try {
      const novoEmprestimo = await Emprestimo.create(req.body);
      res.status(201).json(novoEmprestimo);
    } catch (error) {
      console.error("Erro ao criar empréstimo:", error);
      res.status(400).json({ error: "Erro ao criar empréstimo." });
    }
  },

  // Listar empréstimos detalhados
  async listar(req, res) {
    try {
      const emprestimos = await Emprestimo.findAllDetalhado();
      res.json(emprestimos);
    } catch (error) {
      console.error("Erro ao listar empréstimos:", error);
      res.status(500).json({ error: "Erro ao listar empréstimos." });
    }
  },

  // Buscar empréstimo por ID
  async buscarPorId(req, res) {
    try {
      const id = req.params.id;
      const emprestimo = await Emprestimo.findById(id);
      if (!emprestimo) {
        return res.status(404).json({ error: "Empréstimo não encontrado." });
      }
      res.json(emprestimo);
    } catch (error) {
      console.error("Erro ao buscar empréstimo:", error);
      res.status(500).json({ error: "Erro ao buscar empréstimo." });
    }
  },

  // Devolver o empréstimo (atualiza o status e a data de devolução)
  async devolver(req, res) {
    try {
      const id = req.params.id;
      const data_devolucao = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const status = "devolvido";

      // Busca o empréstimo atual
      const emprestimo = await Emprestimo.findById(id);
      if (!emprestimo) {
        return res.status(404).json({ error: "Empréstimo não encontrado." });
      }

      // Atualiza o empréstimo com a data de devolução e status
      const atualizado = await Emprestimo.update(id, {
        funcionario_id: emprestimo.funcionario_id,
        equipamento_id: emprestimo.equipamento_id,
        data_retirada: emprestimo.data_retirada,
        data_devolucao,
        status
      });

      res.json(atualizado);
    } catch (error) {
      console.error("Erro ao devolver empréstimo:", error);
      res.status(500).json({ error: "Erro ao devolver empréstimo." });
    }
  },

  // Deletar um empréstimo por ID
  async deletarPorId(req, res) {
    try {
      const id = req.params.id;
      const emprestimo = await Emprestimo.findById(id);
      if (!emprestimo) {
        return res.status(404).json({ error: "Empréstimo não encontrado." });
      }

      // Deleta o empréstimo
      await Emprestimo.delete(id);
      res.status(200).json({ message: "Empréstimo deletado com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar empréstimo:", error);
      res.status(500).json({ error: "Erro ao deletar empréstimo." });
    }
  },

  // Deletar todos os empréstimos
  async deletarTodos(req, res) {
    try {
      await Emprestimo.deleteAll();
      res.status(200).json({ message: "Todos os empréstimos foram deletados." });
    } catch (error) {
      console.error("Erro ao deletar todos os empréstimos:", error);
      res.status(500).json({ error: "Erro ao deletar todos os empréstimos." });
    }
  }
};

module.exports = emprestimoController;
