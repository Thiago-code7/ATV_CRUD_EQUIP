const pool = require("../db");

const Equipamento = {
  async create({ nome, descricao, numero_patrimonio }) {
    const result = await pool.query(
      "INSERT INTO equipamentos (nome, descricao, numero_patrimonio) VALUES ($1, $2, $3) RETURNING *",
      [nome, descricao, numero_patrimonio]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query("SELECT * FROM equipamentos");
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query("SELECT * FROM equipamentos WHERE id = $1", [id]);
    return result.rows[0];
  },

  async update(id, { nome, descricao, numero_patrimonio }) {
    const result = await pool.query(
      "UPDATE equipamentos SET nome = $1, descricao = $2, numero_patrimonio = $3 WHERE id = $4 RETURNING *",
      [nome, descricao, numero_patrimonio, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM equipamentos WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },

    async deleteAll() {
      const result = await pool.query("DELETE FROM equipamentos RETURNING *");
      return result.rows;
    }
};

module.exports = Equipamento;
