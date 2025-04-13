const pool = require("../db");

const Emprestimo = {
  // Criar um novo empréstimo
  async create({ funcionario_id, equipamento_id, data_retirada, data_devolucao, status }) {
    const result = await pool.query(
      `INSERT INTO emprestimos 
      (funcionario_id, equipamento_id, data_retirada, data_devolucao, status) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [funcionario_id, equipamento_id, data_retirada, data_devolucao, status]
    );
    return result.rows[0];
  },

  // Buscar todos os empréstimos
  async findAll() {
    const result = await pool.query("SELECT * FROM emprestimos");
    return result.rows;
  },

  // Buscar um empréstimo pelo ID
  async findById(id) {
    const result = await pool.query("SELECT * FROM emprestimos WHERE id = $1", [id]);
    return result.rows[0];
  },

  // Atualizar um empréstimo
  async update(id, { funcionario_id, equipamento_id, data_retirada, data_devolucao, status }) {
    const result = await pool.query(
      `UPDATE emprestimos SET 
      funcionario_id = $1, equipamento_id = $2, data_retirada = $3, 
      data_devolucao = $4, status = $5 
      WHERE id = $6 RETURNING *`,
      [funcionario_id, equipamento_id, data_retirada, data_devolucao, status, id]
    );
    return result.rows[0];
  },

  // Deletar um empréstimo
  async delete(id) {
    const result = await pool.query("DELETE FROM emprestimos WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  },

  // Deletar todos os empréstimos
  async deleteAll() {
    const result = await pool.query("DELETE FROM emprestimos RETURNING *");
    return result.rows;
  },

  // Buscar todos os empréstimos com dados detalhados (JOIN)
  async findAllDetalhado() {
    const result = await pool.query(`
      SELECT 
        e.id,
        f.nome AS funcionario,
        eq.nome AS equipamento,
        e.data_retirada,
        e.data_devolucao,
        e.status
      FROM emprestimos e
      JOIN funcionarios f ON f.id = e.funcionario_id
      JOIN equipamentos eq ON eq.id = e.equipamento_id
      ORDER BY e.id
    `);
    return result.rows;
  }
};

module.exports = Emprestimo;
