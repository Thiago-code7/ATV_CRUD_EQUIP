const pool = require("../db");

const Emprestimo = {
  async create({ funcionario_id, equipamento_id, data_retirada, status }) {
    const result = await pool.query(
      `INSERT INTO emprestimos (funcionario_id, equipamento_id, data_retirada, status) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [funcionario_id, equipamento_id, data_retirada, status]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query(
      `SELECT e.id, f.nome AS funcionario, eq.nome AS equipamento, e.data_retirada, 
              e.data_devolucao, e.status
       FROM emprestimos e
       JOIN funcionarios f ON f.id = e.funcionario_id
       JOIN equipamentos eq ON eq.id = e.equipamento_id`
    );
    return result.rows;
  },

  async marcarDevolucao(id, data_devolucao) {
    const result = await pool.query(
      `UPDATE emprestimos 
       SET data_devolucao = $1, status = 'Devolvido' 
       WHERE id = $2 RETURNING *`,
      [data_devolucao, id]
    );
    return result.rows[0];
  }
};

module.exports = Emprestimo;
